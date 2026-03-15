import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptRoot, '../../..');
const clientRoot = path.join(repoRoot, 'apps/client/src');

const filePaths = {
  analyticsCatalogOutput: path.join(
    repoRoot,
    'packages/analytics-catalog/src/generated/analytics-catalog.ts',
  ),
  analyticsCsvOutput: path.join(
    repoRoot,
    'apps/client/ANALYTICS_EVENT_MAP.csv',
  ),
  basicLayout: path.join(clientRoot, 'shared/router/basic-layout.tsx'),
  globalLayout: path.join(clientRoot, 'shared/router/global-layout.tsx'),
  layoutFreeRoutes: path.join(
    clientRoot,
    'shared/router/routes/layout-free-routes.tsx',
  ),
  lazyRoutes: path.join(clientRoot, 'shared/router/lazy.ts'),
  routePath: path.join(clientRoot, 'shared/router/path.ts'),
  clickEvents: path.join(clientRoot, 'shared/analytics/events/click-events.ts'),
  showEvents: path.join(clientRoot, 'shared/analytics/events/show-events.ts'),
  errorPage: path.join(clientRoot, 'shared/pages/error/error.tsx'),
};

const routeArrayConfigs = [
  {
    filePath: path.join(clientRoot, 'shared/router/routes/global-routes.tsx'),
    exportName: 'globalRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/auth-routes.tsx'),
    exportName: 'authRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/my-page-routes.tsx'),
    exportName: 'myPageRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(
      clientRoot,
      'shared/router/routes/timetable-routes.tsx',
    ),
    exportName: 'timetableSubRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/setlist-routes.tsx'),
    exportName: 'setlistRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/fallback-routes.tsx'),
    exportName: 'fallbackRoutes',
    parentFiles: [filePaths.globalLayout],
  },
];

const manualRouteConfigs = [
  {
    routePathKey: 'ONBOARDING',
    getFiles: ({ layoutFreeRouteMap }) => [
      filePaths.basicLayout,
      layoutFreeRouteMap.get('onboardingRoute'),
    ],
  },
  {
    routePathKey: 'TIMETABLE_DETAIL',
    getFiles: ({ layoutFreeRouteMap }) => [
      filePaths.basicLayout,
      layoutFreeRouteMap.get('timetableDetailRoute'),
    ],
  },
  {
    routePathKey: 'MY_TIMETABLE_DETAIL',
    getFiles: ({ layoutFreeRouteMap }) => [
      filePaths.basicLayout,
      layoutFreeRouteMap.get('myTimetableDetailRoute'),
    ],
  },
  {
    routePathKey: 'LOGIN',
    getFiles: ({ lazyRouteMap }) => [
      filePaths.basicLayout,
      lazyRouteMap.get('LoginPage'),
    ],
  },
];

const moduleAliasDirectories = [
  { prefix: '@shared/', directory: 'shared' },
  { prefix: '@pages/', directory: 'pages' },
];

const ignoredSourceFilePatterns = [/\.css\.ts$/, /\.test\.ts$/, /\.d\.ts$/];
const eventTypeOrder = ['show', 'click'];
const csvHeaders = [
  '페이지',
  '상태',
  '속성',
  '공통_컴포넌트',
  '요소',
  '이벤트_타입',
  'show_타입',
  '이벤트명',
  '파라미터',
  '파라미터_타입',
  '필수_파라미터',
  '소스_파일',
  '소스_컴포넌트',
  '소스_라인',
];

const sourceFileCache = new Map();
const importBindingsCache = new Map();
const resolvedModuleCache = new Map();

function walkFiles(dirPath, result = []) {
  const entries = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name));

  entries.forEach((entry) => {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkFiles(entryPath, result);
      return;
    }

    const isSourceFile = /\.(ts|tsx)$/.test(entry.name);
    const isIgnoredFile = ignoredSourceFilePatterns.some((pattern) =>
      pattern.test(entry.name),
    );

    if (isSourceFile && !isIgnoredFile) {
      result.push(entryPath);
    }
  });

  return result;
}

function readSourceFile(filePath) {
  const cachedSourceFile = sourceFileCache.get(filePath);

  if (cachedSourceFile) {
    return cachedSourceFile;
  }

  const nextSourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  sourceFileCache.set(filePath, nextSourceFile);

  return nextSourceFile;
}

function unwrapExpression(expression) {
  let nextExpression = expression;

  while (
    nextExpression &&
    (ts.isAsExpression(nextExpression) ||
      ts.isParenthesizedExpression(nextExpression) ||
      ('isSatisfiesExpression' in ts &&
        ts.isSatisfiesExpression(nextExpression)))
  ) {
    nextExpression = nextExpression.expression;
  }

  return nextExpression;
}

function getPropertyName(nameNode) {
  if (
    ts.isIdentifier(nameNode) ||
    ts.isStringLiteral(nameNode) ||
    ts.isNumericLiteral(nameNode)
  ) {
    return nameNode.text;
  }

  return nameNode.getText();
}

function getLiteralValue(expression) {
  const nextExpression = unwrapExpression(expression);

  if (
    ts.isStringLiteral(nextExpression) ||
    ts.isNumericLiteral(nextExpression)
  ) {
    return nextExpression.text;
  }

  if (nextExpression.kind === ts.SyntaxKind.TrueKeyword) {
    return 'true';
  }

  if (nextExpression.kind === ts.SyntaxKind.FalseKeyword) {
    return 'false';
  }

  return null;
}

function getBooleanLiteralValue(expression) {
  const nextExpression = unwrapExpression(expression);

  if (nextExpression.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (nextExpression.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  return null;
}

function getObjectPropertyAssignment(objectLiteral, propertyName) {
  return (
    objectLiteral.properties.find(
      (property) =>
        ts.isPropertyAssignment(property) &&
        getPropertyName(property.name) === propertyName,
    ) ?? null
  );
}

function getObjectPropertyInitializer(objectLiteral, propertyName) {
  const property = getObjectPropertyAssignment(objectLiteral, propertyName);

  return property ? unwrapExpression(property.initializer) : null;
}

function findVariableInitializer(filePath, variableName) {
  const sourceFile = readSourceFile(filePath);
  let initializer = null;

  sourceFile.statements.forEach((statement) => {
    if (!ts.isVariableStatement(statement)) {
      return;
    }

    statement.declarationList.declarations.forEach((declaration) => {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === variableName &&
        declaration.initializer
      ) {
        initializer = unwrapExpression(declaration.initializer);
      }
    });
  });

  return initializer;
}

function resolveModulePath(fromFilePath, moduleSpecifier) {
  const cacheKey = `${fromFilePath}:${moduleSpecifier}`;

  if (resolvedModuleCache.has(cacheKey)) {
    return resolvedModuleCache.get(cacheKey);
  }

  let unresolvedPath = null;

  if (moduleSpecifier.startsWith('.')) {
    unresolvedPath = path.resolve(path.dirname(fromFilePath), moduleSpecifier);
  } else {
    const matchedAlias = moduleAliasDirectories.find(({ prefix }) =>
      moduleSpecifier.startsWith(prefix),
    );

    if (matchedAlias) {
      unresolvedPath = path.join(
        clientRoot,
        matchedAlias.directory,
        moduleSpecifier.slice(matchedAlias.prefix.length),
      );
    }
  }

  if (!unresolvedPath) {
    resolvedModuleCache.set(cacheKey, null);
    return null;
  }

  const resolvedPath =
    [
      unresolvedPath,
      `${unresolvedPath}.ts`,
      `${unresolvedPath}.tsx`,
      path.join(unresolvedPath, 'index.ts'),
      path.join(unresolvedPath, 'index.tsx'),
    ].find((candidate) => fs.existsSync(candidate)) ?? null;

  resolvedModuleCache.set(cacheKey, resolvedPath);

  return resolvedPath;
}

function parseImportBindings(filePath) {
  const cachedImportBindings = importBindingsCache.get(filePath);

  if (cachedImportBindings) {
    return cachedImportBindings;
  }

  const sourceFile = readSourceFile(filePath);
  const importBindings = new Map();

  sourceFile.forEachChild((node) => {
    if (!ts.isImportDeclaration(node) || !node.importClause) {
      return;
    }

    const moduleSpecifier = node.moduleSpecifier.text;
    const { importClause } = node;

    if (importClause.name) {
      importBindings.set(importClause.name.text, {
        moduleSpecifier,
        importedName: 'default',
      });
    }

    if (
      importClause.namedBindings &&
      ts.isNamedImports(importClause.namedBindings)
    ) {
      importClause.namedBindings.elements.forEach((element) => {
        importBindings.set(element.name.text, {
          moduleSpecifier,
          importedName: getPropertyName(element.propertyName ?? element.name),
        });
      });
    }
  });

  importBindingsCache.set(filePath, importBindings);

  return importBindings;
}

function visitImportCalls(node, onImportCall) {
  if (
    ts.isCallExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ImportKeyword
  ) {
    onImportCall(node);
    return;
  }

  ts.forEachChild(node, (child) => visitImportCalls(child, onImportCall));
}

function parseRoutePathMap() {
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
      routePathMap.set(getPropertyName(property.name), routePath);
    }
  });

  return routePathMap;
}

function parseLazyRouteMap() {
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

function parseLayoutFreeRouteMap(lazyRouteMap) {
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
  const nextExpression = unwrapExpression(expression);

  if (ts.isStringLiteral(nextExpression)) {
    return nextExpression.text;
  }

  if (
    ts.isPropertyAccessExpression(nextExpression) &&
    nextExpression.expression.getText() === 'routePath'
  ) {
    return routePathMap.get(nextExpression.name.text) ?? null;
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

function parseParamDefinition(paramName, paramDefinition) {
  let paramType = '';
  let required = false;
  const oneOf = [];

  paramDefinition.properties.forEach((property) => {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }

    const propertyName = getPropertyName(property.name);
    const initializer = unwrapExpression(property.initializer);

    if (propertyName === 'type' && ts.isStringLiteral(initializer)) {
      paramType = initializer.text;
    }

    if (propertyName === 'required') {
      required = getBooleanLiteralValue(initializer) === true;
    }

    if (propertyName === 'oneOf' && ts.isArrayLiteralExpression(initializer)) {
      initializer.elements.forEach((item) => {
        const literalValue = getLiteralValue(item);

        if (literalValue !== null) {
          oneOf.push(literalValue);
        }
      });
    }
  });

  return {
    name: paramName,
    type: paramType === 'enum' ? `enum: ${oneOf.join(', ')}` : paramType,
    required,
  };
}

function parseEventDefinitions({ filePath, variableName, kind }) {
  const eventsInitializer = findVariableInitializer(filePath, variableName);
  const eventMap = new Map();

  if (!eventsInitializer || !ts.isArrayLiteralExpression(eventsInitializer)) {
    return eventMap;
  }

  eventsInitializer.elements.forEach((element) => {
    if (!ts.isObjectLiteralExpression(element)) {
      return;
    }

    const eventNameInitializer = getObjectPropertyInitializer(element, 'name');
    const showTypeInitializer = getObjectPropertyInitializer(element, 'type');
    const paramsInitializer = getObjectPropertyInitializer(element, 'params');

    if (!eventNameInitializer || !ts.isStringLiteral(eventNameInitializer)) {
      return;
    }

    const params =
      paramsInitializer && ts.isObjectLiteralExpression(paramsInitializer)
        ? paramsInitializer.properties.flatMap((property) => {
            if (!ts.isPropertyAssignment(property)) {
              return [];
            }

            const paramDefinition = unwrapExpression(property.initializer);

            if (!ts.isObjectLiteralExpression(paramDefinition)) {
              return [];
            }

            return [
              parseParamDefinition(
                getPropertyName(property.name),
                paramDefinition,
              ),
            ];
          })
        : [];

    eventMap.set(eventNameInitializer.text, {
      kind,
      showType:
        showTypeInitializer && ts.isStringLiteral(showTypeInitializer)
          ? showTypeInitializer.text
          : '',
      params,
    });
  });

  return eventMap;
}

function buildImportGraph(allFiles) {
  const importGraph = new Map();

  allFiles.forEach((filePath) => {
    const sourceFile = readSourceFile(filePath);
    const imports = [];

    sourceFile.forEachChild((node) => {
      if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) {
        return;
      }

      const moduleSpecifier = node.moduleSpecifier?.text;

      if (!moduleSpecifier) {
        return;
      }

      const resolvedFilePath = resolveModulePath(filePath, moduleSpecifier);

      if (resolvedFilePath) {
        imports.push(resolvedFilePath);
      }
    });

    importGraph.set(filePath, [...new Set(imports)]);
  });

  return importGraph;
}

function getEnclosingName(node) {
  let currentNode = node.parent;

  while (currentNode) {
    if (ts.isFunctionDeclaration(currentNode) && currentNode.name) {
      return currentNode.name.text;
    }

    if (ts.isMethodDeclaration(currentNode) && currentNode.name) {
      return currentNode.name.getText();
    }

    if (
      (ts.isArrowFunction(currentNode) ||
        ts.isFunctionExpression(currentNode)) &&
      currentNode.parent
    ) {
      if (
        ts.isVariableDeclaration(currentNode.parent) &&
        ts.isIdentifier(currentNode.parent.name)
      ) {
        return currentNode.parent.name.text;
      }

      if (ts.isPropertyAssignment(currentNode.parent)) {
        return getPropertyName(currentNode.parent.name);
      }
    }

    currentNode = currentNode.parent;
  }

  return path.basename(
    node.getSourceFile().fileName,
    path.extname(node.getSourceFile().fileName),
  );
}

function getJsxAttributeString(attributes, attributeName) {
  const attribute = attributes.properties.find(
    (property) =>
      ts.isJsxAttribute(property) && property.name.text === attributeName,
  );

  if (
    attribute &&
    ts.isJsxAttribute(attribute) &&
    attribute.initializer &&
    ts.isStringLiteral(attribute.initializer)
  ) {
    return attribute.initializer.text;
  }

  return null;
}

function parseLoggingBindings(filePath) {
  const sourceFile = readSourceFile(filePath);
  const bindings = {
    LogClickEvent: null,
    LogShowEvent: null,
    logClickEvent: null,
  };

  sourceFile.forEachChild((node) => {
    if (
      !ts.isImportDeclaration(node) ||
      node.moduleSpecifier.text !== '@shared/analytics/logging' ||
      !node.importClause?.namedBindings ||
      !ts.isNamedImports(node.importClause.namedBindings)
    ) {
      return;
    }

    node.importClause.namedBindings.elements.forEach((element) => {
      const importedName = getPropertyName(
        element.propertyName ?? element.name,
      );
      const localName = element.name.text;

      if (importedName in bindings) {
        bindings[importedName] = localName;
      }
    });
  });

  return bindings;
}

function findFirstWrappedElementName(node, wrapperTagNames) {
  let elementName = null;

  const visitNode = (currentNode) => {
    if (elementName) {
      return;
    }

    if (ts.isJsxElement(currentNode)) {
      const tagName = currentNode.openingElement.tagName.getText();

      if (wrapperTagNames.has(tagName)) {
        currentNode.children.forEach((child) => visitNode(child));
        return;
      }

      elementName = tagName;
      return;
    }

    if (ts.isJsxSelfClosingElement(currentNode)) {
      const tagName = currentNode.tagName.getText();

      if (!wrapperTagNames.has(tagName)) {
        elementName = tagName;
      }

      return;
    }

    ts.forEachChild(currentNode, visitNode);
  };

  if (ts.isJsxElement(node)) {
    node.children.forEach((child) => visitNode(child));
  }

  return elementName ?? 'unknown';
}

function extractClickPayloadName(payloadExpression) {
  if (!ts.isObjectLiteralExpression(payloadExpression)) {
    return null;
  }

  const nameInitializer = getObjectPropertyInitializer(
    payloadExpression,
    'name',
  );

  return nameInitializer && ts.isStringLiteral(nameInitializer)
    ? nameInitializer.text
    : null;
}

function parseUsageByFile(allFiles) {
  const usageByFile = new Map();

  allFiles.forEach((filePath) => {
    const sourceFile = readSourceFile(filePath);
    const loggingBindings = parseLoggingBindings(filePath);
    const wrapperTagNames = new Set(
      [loggingBindings.LogClickEvent, loggingBindings.LogShowEvent].filter(
        Boolean,
      ),
    );

    if (wrapperTagNames.size === 0 && !loggingBindings.logClickEvent) {
      return;
    }

    const rows = [];

    const addUsage = ({ kind, eventName, element, node }) => {
      rows.push({
        kind,
        eventName,
        element,
        sourceComponent: getEnclosingName(node),
        sourceLine:
          sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      });
    };

    const visitNode = (node) => {
      if (
        loggingBindings.LogShowEvent &&
        ts.isJsxSelfClosingElement(node) &&
        node.tagName.getText() === loggingBindings.LogShowEvent
      ) {
        const eventName = getJsxAttributeString(node.attributes, 'name');

        if (eventName) {
          addUsage({
            kind: 'show',
            eventName,
            element: 'LogShowEvent',
            node,
          });
        }
      }

      if (
        loggingBindings.LogClickEvent &&
        ts.isJsxElement(node) &&
        node.openingElement.tagName.getText() === loggingBindings.LogClickEvent
      ) {
        const eventName = getJsxAttributeString(
          node.openingElement.attributes,
          'name',
        );

        if (eventName) {
          addUsage({
            kind: 'click',
            eventName,
            element: findFirstWrappedElementName(node, wrapperTagNames),
            node,
          });
        }
      }

      if (
        loggingBindings.logClickEvent &&
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === loggingBindings.logClickEvent
      ) {
        const [payloadExpression] = node.arguments;
        const eventName = payloadExpression
          ? extractClickPayloadName(payloadExpression)
          : null;

        if (eventName) {
          addUsage({
            kind: 'click',
            eventName,
            element: `handler:${getEnclosingName(node)}`,
            node,
          });
        }
      }

      ts.forEachChild(node, visitNode);
    };

    visitNode(sourceFile);

    if (rows.length > 0) {
      usageByFile.set(filePath, rows);
    }
  });

  return usageByFile;
}

function findReachableFiles(importGraph, startFiles) {
  const reachableFiles = new Set();
  const queue = [...startFiles.filter(Boolean)];

  while (queue.length > 0) {
    const currentFile = queue.pop();

    if (reachableFiles.has(currentFile)) {
      continue;
    }

    reachableFiles.add(currentFile);

    (importGraph.get(currentFile) ?? []).forEach((nextFile) => {
      queue.push(nextFile);
    });
  }

  return reachableFiles;
}

function findShortestDistance(importGraph, startFile, targetFile) {
  if (startFile === targetFile) {
    return 0;
  }

  const queue = [[startFile, 0]];
  const visitedFiles = new Set([startFile]);
  let queueIndex = 0;

  while (queueIndex < queue.length) {
    const [currentFile, distance] = queue[queueIndex];
    queueIndex += 1;

    for (const nextFile of importGraph.get(currentFile) ?? []) {
      if (nextFile === targetFile) {
        return distance + 1;
      }

      if (!visitedFiles.has(nextFile)) {
        visitedFiles.add(nextFile);
        queue.push([nextFile, distance + 1]);
      }
    }
  }

  return Number.POSITIVE_INFINITY;
}

function toRelativeClientPath(filePath) {
  return path.relative(clientRoot, filePath).replaceAll(path.sep, '/');
}

function escapeCsv(value) {
  const stringValue = String(value ?? '');

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function buildRouteEntries({ routePathMap, lazyRouteMap, layoutFreeRouteMap }) {
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

function buildRouteReachableFilesMap(importGraph, routeEntries) {
  return new Map(
    routeEntries.map((routeEntry) => [
      routeEntry.path,
      findReachableFiles(importGraph, routeEntry.files),
    ]),
  );
}

function buildRouteCountByFile(routeReachableFilesMap) {
  const routeCountByFile = new Map();

  routeReachableFilesMap.forEach((reachableFiles, routePath) => {
    reachableFiles.forEach((filePath) => {
      const routeSet = routeCountByFile.get(filePath) ?? new Set();
      routeSet.add(routePath);
      routeCountByFile.set(filePath, routeSet);
    });
  });

  return routeCountByFile;
}

function buildPageShowEventsByFile(usageByFile, showEventMap) {
  const pageShowEventsByFile = new Map();

  usageByFile.forEach((usages, filePath) => {
    usages.forEach((usage) => {
      const showEvent = showEventMap.get(usage.eventName);

      if (usage.kind === 'show' && showEvent?.showType === 'page') {
        const eventNames = pageShowEventsByFile.get(filePath) ?? [];
        eventNames.push(usage.eventName);
        pageShowEventsByFile.set(filePath, eventNames);
      }
    });
  });

  return pageShowEventsByFile;
}

function getNearestState({
  importGraph,
  filePath,
  pageShowFiles,
  pageShowEventsByFile,
}) {
  let nearestState = '';
  let shortestDistance = Number.POSITIVE_INFINITY;

  pageShowFiles.forEach((pageShowFile) => {
    const distance = findShortestDistance(importGraph, pageShowFile, filePath);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestState = pageShowEventsByFile.get(pageShowFile)?.[0] ?? '';
    }
  });

  return Number.isFinite(shortestDistance) ? nearestState : '';
}

function buildCatalogRows({
  importGraph,
  routeEntries,
  routeReachableFilesMap,
  routeCountByFile,
  usageByFile,
  clickEventMap,
  showEventMap,
  pageShowEventsByFile,
}) {
  const rows = [];

  routeEntries.forEach((routeEntry) => {
    const reachableFiles =
      routeReachableFilesMap.get(routeEntry.path) ?? new Set();
    const filesWithUsages = [...reachableFiles].filter((filePath) =>
      usageByFile.has(filePath),
    );
    const pageShowFiles = filesWithUsages.filter((filePath) =>
      pageShowEventsByFile.has(filePath),
    );

    filesWithUsages.forEach((filePath) => {
      if (filePath === filePaths.errorPage && routeEntry.path !== '*') {
        return;
      }

      const routeSet = routeCountByFile.get(filePath);
      const isCommon =
        (filePath.includes('/shared/') ||
          Boolean(routeSet && routeSet.size > 1)) &&
        !pageShowEventsByFile.has(filePath);
      const nearestState = isCommon
        ? ''
        : getNearestState({
            importGraph,
            filePath,
            pageShowFiles,
            pageShowEventsByFile,
          });

      (usageByFile.get(filePath) ?? []).forEach((usage) => {
        const eventDefinition =
          usage.kind === 'click'
            ? clickEventMap.get(usage.eventName)
            : showEventMap.get(usage.eventName);

        if (!eventDefinition) {
          return;
        }

        const state =
          usage.kind === 'show' && eventDefinition.showType === 'page'
            ? usage.eventName
            : isCommon
              ? ''
              : nearestState;

        rows.push({
          page: routeEntry.path,
          path: routeEntry.path,
          state,
          attribute: isCommon ? '공통' : '',
          commonComponent: isCommon ? usage.sourceComponent : '',
          element: usage.element,
          eventType: usage.kind,
          eventName: usage.eventName,
          showType:
            usage.kind === 'show' && eventDefinition.showType
              ? eventDefinition.showType
              : '',
          params: eventDefinition.params,
          sourceFile: toRelativeClientPath(filePath),
          sourceComponent: usage.sourceComponent,
          sourceLine: usage.sourceLine,
        });
      });
    });
  });

  return rows;
}

function deduplicateRows(rows) {
  const seenKeys = new Set();
  const deduplicatedRows = [];

  rows.forEach((row) => {
    const dedupeKey = JSON.stringify(row);

    if (!seenKeys.has(dedupeKey)) {
      seenKeys.add(dedupeKey);
      deduplicatedRows.push(row);
    }
  });

  return deduplicatedRows;
}

function sortRows(rows) {
  return rows.sort((left, right) => {
    const eventTypeDiff =
      eventTypeOrder.indexOf(left.eventType) -
      eventTypeOrder.indexOf(right.eventType);

    return (
      left.path.localeCompare(right.path) ||
      left.state.localeCompare(right.state) ||
      eventTypeDiff ||
      left.attribute.localeCompare(right.attribute) ||
      left.eventName.localeCompare(right.eventName) ||
      left.sourceFile.localeCompare(right.sourceFile) ||
      left.sourceLine - right.sourceLine
    );
  });
}

function createAnalyticsCatalogFileContent({ generatedAt, rows }) {
  return `import type { AnalyticsCatalogData } from '../types';

export const analyticsCatalog = ${JSON.stringify(
    {
      generatedAt,
      rows,
    },
    null,
    2,
  )} satisfies AnalyticsCatalogData;
`;
}

function createCsvContent(rows) {
  return [
    csvHeaders.join(','),
    ...rows.map((row) =>
      [
        row.path,
        row.state,
        row.attribute,
        row.commonComponent,
        row.element,
        row.eventType,
        row.showType,
        row.eventName,
        row.params.map((param) => param.name).join('; '),
        row.params.map((param) => `${param.name}: ${param.type}`).join('; '),
        row.params
          .filter((param) => param.required)
          .map((param) => param.name)
          .join('; '),
        row.sourceFile,
        row.sourceComponent,
        row.sourceLine,
      ]
        .map(escapeCsv)
        .join(','),
    ),
  ].join('\n');
}

function writeOutputs({ generatedAt, rows }) {
  fs.mkdirSync(path.dirname(filePaths.analyticsCatalogOutput), {
    recursive: true,
  });
  fs.mkdirSync(path.dirname(filePaths.analyticsCsvOutput), { recursive: true });

  fs.writeFileSync(
    filePaths.analyticsCatalogOutput,
    createAnalyticsCatalogFileContent({ generatedAt, rows }),
  );
  fs.writeFileSync(filePaths.analyticsCsvOutput, createCsvContent(rows));
}

function main() {
  const allClientFiles = walkFiles(clientRoot);
  const importGraph = buildImportGraph(allClientFiles);
  const routePathMap = parseRoutePathMap();
  const lazyRouteMap = parseLazyRouteMap();
  const layoutFreeRouteMap = parseLayoutFreeRouteMap(lazyRouteMap);
  const routeEntries = buildRouteEntries({
    routePathMap,
    lazyRouteMap,
    layoutFreeRouteMap,
  });
  const clickEventMap = parseEventDefinitions({
    filePath: filePaths.clickEvents,
    variableName: 'clickEvents',
    kind: 'click',
  });
  const showEventMap = parseEventDefinitions({
    filePath: filePaths.showEvents,
    variableName: 'showEvents',
    kind: 'show',
  });
  const usageByFile = parseUsageByFile(allClientFiles);
  const routeReachableFilesMap = buildRouteReachableFilesMap(
    importGraph,
    routeEntries,
  );
  const routeCountByFile = buildRouteCountByFile(routeReachableFilesMap);
  const pageShowEventsByFile = buildPageShowEventsByFile(
    usageByFile,
    showEventMap,
  );
  const rows = buildCatalogRows({
    importGraph,
    routeEntries,
    routeReachableFilesMap,
    routeCountByFile,
    usageByFile,
    clickEventMap,
    showEventMap,
    pageShowEventsByFile,
  });
  const generatedAt = new Date().toISOString();
  const deduplicatedRows = sortRows(deduplicateRows(rows));

  writeOutputs({
    generatedAt,
    rows: deduplicatedRows,
  });

  console.log(
    `Generated analytics catalog from code with ${deduplicatedRows.length} rows at ${generatedAt}`,
  );
}

try {
  main();
} catch (error) {
  console.error('Failed to generate analytics catalog from code.');
  throw error;
}
