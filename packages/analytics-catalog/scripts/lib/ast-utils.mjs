import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';

import {
  clientRoot,
  ignoredSourceFilePatterns,
  moduleAliasDirectories,
} from './config.mjs';

const sourceFileCache = new Map();
const importBindingsCache = new Map();
const resolvedModuleCache = new Map();

export function walkFiles(dirPath, result = []) {
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

export function readSourceFile(filePath) {
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

export function unwrapExpression(expression) {
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

export function getPropertyName(nameNode) {
  if (
    ts.isIdentifier(nameNode) ||
    ts.isStringLiteral(nameNode) ||
    ts.isNumericLiteral(nameNode)
  ) {
    return nameNode.text;
  }

  return nameNode.getText();
}

export function getLiteralValue(expression) {
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

export function getBooleanLiteralValue(expression) {
  const nextExpression = unwrapExpression(expression);

  if (nextExpression.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (nextExpression.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  return null;
}

export function getObjectPropertyAssignment(objectLiteral, propertyName) {
  return (
    objectLiteral.properties.find(
      (property) =>
        ts.isPropertyAssignment(property) &&
        getPropertyName(property.name) === propertyName,
    ) ?? null
  );
}

export function getObjectPropertyInitializer(objectLiteral, propertyName) {
  const property = getObjectPropertyAssignment(objectLiteral, propertyName);

  return property ? unwrapExpression(property.initializer) : null;
}

export function findVariableInitializer(filePath, variableName) {
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

export function resolveModulePath(fromFilePath, moduleSpecifier) {
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

export function parseImportBindings(filePath) {
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

export function visitImportCalls(node, onImportCall) {
  if (
    ts.isCallExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ImportKeyword
  ) {
    onImportCall(node);
    return;
  }

  ts.forEachChild(node, (child) => visitImportCalls(child, onImportCall));
}
