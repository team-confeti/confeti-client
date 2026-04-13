import fs from 'node:fs';
import path from 'node:path';
import { inspect } from 'node:util';

import prettier from 'prettier';

import {
  csvHeaders,
  eventTypeOrder,
  filePaths,
  generatedAtPlaceholder,
} from './config.mjs';

let prettierConfigPromise = null;

async function getPrettierConfig() {
  if (!prettierConfigPromise) {
    prettierConfigPromise = prettier.resolveConfig(
      filePaths.analyticsCatalogOutput,
    );
  }

  return prettierConfigPromise;
}

export function deduplicateRows(rows) {
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

export function sortRows(rows) {
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
      left.sourceComponent.localeCompare(right.sourceComponent)
    );
  });
}

export async function createAnalyticsCatalogFileContent({ generatedAt, rows }) {
  const analyticsCatalogContent = inspect(
    {
      generatedAt,
      rows,
    },
    {
      depth: null,
      compact: false,
      maxArrayLength: null,
      sorted: false,
    },
  );

  const prettierConfig = await getPrettierConfig();

  return prettier.format(
    `import type { AnalyticsCatalogData } from '../types';

export const analyticsCatalog = ${analyticsCatalogContent} satisfies AnalyticsCatalogData;
`,
    {
      ...(prettierConfig ?? {}),
      filepath: filePaths.analyticsCatalogOutput,
    },
  );
}

function escapeCsv(value) {
  const stringValue = String(value ?? '');

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export function createCsvContent(rows) {
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
      ]
        .map(escapeCsv)
        .join(','),
    ),
  ].join('\n');
}

export function readFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, 'utf8');
}

export function normalizeAnalyticsCatalogContent(content) {
  return content.replace(
    /["']?generatedAt["']?\s*:\s*["'][^"']+["']/,
    `generatedAt: '${generatedAtPlaceholder}'`,
  );
}

export function getExistingGeneratedAt(content) {
  const match = content.match(/["']?generatedAt["']?\s*:\s*["']([^"']+)["']/);

  return match?.[1] ?? null;
}

export function writeFileIfChanged(filePath, nextContent) {
  const currentContent = readFileIfExists(filePath);

  if (currentContent === nextContent) {
    return false;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, nextContent);

  return true;
}
