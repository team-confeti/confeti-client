import ts from 'typescript';

import {
  findVariableInitializer,
  getBooleanLiteralValue,
  getLiteralValue,
  getObjectPropertyInitializer,
  parseImportBindings,
  readSourceFile,
  resolveModulePath,
  visitImportCalls,
} from './ast-utils.mjs';
import { filePaths, manualRouteConfigs, routeArrayConfigs } from './config.mjs';

export function parseRoutePathMap() {
  const routePathInitializer = findVariableInitializer(
    filePaths.routePath,
    'routePath',
  );

  if (
    !routePathInitializer ||
    !ts.isObjectLiteralExpression(routePathInitializer)
  ) {
    return new Map();
  }

  const routePathMap = new Map();

  routePathInitializer.properties.forEach((property) => {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }

    const routePath = getLiteralValue(property.initializer);

    if (routePath !== null) {
      routePathMap.set(property.name.getText(), routePath);
    }
  });

  return routePathMap;
}

export function parseLazyRouteMap() {
  const sourceFile = readSourceFile(filePaths.lazyRoutes);
  const lazyRouteMap = new Map();

  sourceFile.statements.forEach((statement) => {
    if (!ts.isVariableStatement(statement)) {
      return;
    }

    statement.declarationList.declarations.forEach((declaration) => {
      if (!declaration.initializer || !ts.isIdentifier(declaration.name)) {
        return;
      }

      visitImportCalls(declaration.initializer, (importCall) => {
        const [importArgument] = importCall.arguments;

        if (!ts.isStringLiteral(importArgument)) {
          return;
        }

        const resolvedFilePath = resolveModulePath(
          filePaths.lazyRoutes,
          importArgument.text,
        );

        if (resolvedFilePath) {
          lazyRouteMap.set(declaration.name.text, resolvedFilePath);
        }
      });
    });
  });

  return lazyRouteMap;
}

function resolveImportedElementFilePath({
  filePath,
  tagName,
  importBindings,
  lazyRouteMap,
  layoutFreeRouteMap,
}) {
  const binding = importBindings.get(tagName);

  if (!binding) {
    return null;
  }

  const resolvedFilePath = resolveModulePath(filePath, binding.moduleSpecifier);

  if (!resolvedFilePath) {
    return null;
  }

  if (resolvedFilePath === filePaths.lazyRoutes) {
    return lazyRouteMap.get(binding.importedName) ?? null;
  }

  if (resolvedFilePath === filePaths.layoutFreeRoutes) {
    return layoutFreeRouteMap.get(binding.importedName) ?? null;
  }

  return resolvedFilePath;
}

function findElementFilePath({
  filePath,
  expression,
  importBindings,
  lazyRouteMap,
  layoutFreeRouteMap,
}) {
  let elementFilePath = null;

  const visitNode = (node) => {
    if (elementFilePath) {
      return;
    }

    if (ts.isJsxElement(node)) {
      const nextElementFilePath = resolveImportedElementFilePath({
        filePath,
        tagName: node.openingElement.tagName.getText(),
        importBindings,
        lazyRouteMap,
        layoutFreeRouteMap,
      });

      if (nextElementFilePath) {
        elementFilePath = nextElementFilePath;
        return;
      }

      node.children.forEach((child) => visitNode(child));
      return;
    }

    if (ts.isJsxSelfClosingElement(node)) {
      const nextElementFilePath = resolveImportedElementFilePath({
        filePath,
        tagName: node.tagName.getText(),
        importBindings,
        lazyRouteMap,
        layoutFreeRouteMap,
      });

      if (nextElementFilePath) {
        elementFilePath = nextElementFilePath;
      }

      return;
    }

    ts.forEachChild(node, visitNode);
  };

  visitNode(expression);

  return elementFilePath;
}

export function parseLayoutFreeRouteMap(lazyRouteMap) {
  const sourceFile = readSourceFile(filePaths.layoutFreeRoutes);
  const importBindings = parseImportBindings(filePaths.layoutFreeRoutes);
  const layoutRouteMap = new Map();

  sourceFile.statements.forEach((statement) => {
    if (!ts.isVariableStatement(statement)) {
      return;
    }

    statement.declarationList.declarations.forEach((declaration) => {
      if (
        !ts.isIdentifier(declaration.name) ||
        !declaration.initializer ||
        !ts.isObjectLiteralExpression(declaration.initializer)
      ) {
        return;
      }

      const elementInitializer = getObjectPropertyInitializer(
        declaration.initializer,
        'element',
      );

      if (!elementInitializer) {
        return;
      }

      const elementFilePath = findElementFilePath({
        filePath: filePaths.layoutFreeRoutes,
        expression: elementInitializer,
        importBindings,
        lazyRouteMap,
        layoutFreeRouteMap: new Map(),
      });

      if (elementFilePath) {
        layoutRouteMap.set(declaration.name.text, elementFilePath);
      }
    });
  });

  return layoutRouteMap;
}

function extractRoutePath(expression, routePathMap) {
  if (ts.isStringLiteral(expression)) {
    return expression.text;
  }

  if (
    ts.isPropertyAccessExpression(expression) &&
    expression.expression.getText() === 'routePath'
  ) {
    return routePathMap.get(expression.name.text) ?? null;
  }

  return null;
}

function combineRoutePath(parentPath, childPath) {
  if (!childPath) {
    return parentPath || '/';
  }

  if (childPath === '*' || childPath.startsWith('/')) {
    return childPath;
  }

  if (!parentPath || parentPath === '/') {
    return `/${childPath}`;
  }

  return `${parentPath}/${childPath}`;
}

function parseRoutesFromVariable({
  filePath,
  exportName,
  parentFiles,
  routePathMap,
  lazyRouteMap,
  layoutFreeRouteMap,
}) {
  const routesInitializer = findVariableInitializer(filePath, exportName);

  if (!routesInitializer || !ts.isArrayLiteralExpression(routesInitializer)) {
    return [];
  }

  const importBindings = parseImportBindings(filePath);
  const routeEntries = [];

  const visitRouteArray = (routeArray, parentPath, wrapperFiles) => {
    routeArray.elements.forEach((element) => {
      if (ts.isObjectLiteralExpression(element)) {
        visitRouteObject(element, parentPath, wrapperFiles);
      }
    });
  };

  const visitRouteObject = (routeObject, parentPath, wrapperFiles) => {
    const routePathInitializer = getObjectPropertyInitializer(
      routeObject,
      'path',
    );
    const elementInitializer = getObjectPropertyInitializer(
      routeObject,
      'element',
    );
    const childRoutesInitializer = getObjectPropertyInitializer(
      routeObject,
      'children',
    );
    const indexInitializer = getObjectPropertyInitializer(routeObject, 'index');

    const routePath = routePathInitializer
      ? (extractRoutePath(routePathInitializer, routePathMap) ?? '')
      : '';
    const isIndexRoute = indexInitializer
      ? getBooleanLiteralValue(indexInitializer) === true
      : false;
    const elementFilePath = elementInitializer
      ? findElementFilePath({
          filePath,
          expression: elementInitializer,
          importBindings,
          lazyRouteMap,
          layoutFreeRouteMap,
        })
      : null;
    const childRoutes =
      childRoutesInitializer &&
      ts.isArrayLiteralExpression(childRoutesInitializer)
        ? childRoutesInitializer
        : null;

    const fullPath = isIndexRoute
      ? parentPath || '/'
      : combineRoutePath(parentPath, routePath);
    const nextWrapperFiles = elementFilePath
      ? [...wrapperFiles, elementFilePath]
      : wrapperFiles;

    if (childRoutes) {
      visitRouteArray(childRoutes, fullPath, nextWrapperFiles);
      return;
    }

    if (elementFilePath) {
      routeEntries.push({
        path: fullPath,
        files: [...wrapperFiles, elementFilePath],
      });
    }
  };

  visitRouteArray(routesInitializer, '', parentFiles);

  return routeEntries;
}

export function buildRouteEntries({
  routePathMap,
  lazyRouteMap,
  layoutFreeRouteMap,
}) {
  const routeEntries = routeArrayConfigs.flatMap((config) =>
    parseRoutesFromVariable({
      ...config,
      routePathMap,
      lazyRouteMap,
      layoutFreeRouteMap,
    }),
  );

  const manualRouteEntries = manualRouteConfigs
    .map((config) => ({
      path: routePathMap.get(config.routePathKey),
      files: config.getFiles({ lazyRouteMap, layoutFreeRouteMap }),
    }))
    .filter((routeEntry) => routeEntry.path && routeEntry.files.every(Boolean));

  return [...routeEntries, ...manualRouteEntries];
}
