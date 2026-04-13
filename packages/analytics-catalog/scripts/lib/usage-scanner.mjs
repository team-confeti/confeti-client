import path from 'node:path';

import ts from 'typescript';

import {
  getObjectPropertyInitializer,
  getPropertyName,
  readSourceFile,
  resolveModulePath,
} from './ast-utils.mjs';

export function buildImportGraph(allFiles) {
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

export function parseUsageByFile(allFiles) {
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
