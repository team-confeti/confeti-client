import { walkFiles } from './lib/ast-utils.mjs';
import {
  buildCatalogRows,
  buildPageShowEventsByFile,
  buildRouteCountByFile,
  buildRouteReachableFilesMap,
} from './lib/catalog-builder.mjs';
import {
  createAnalyticsCatalogFileContent,
  createCsvContent,
  deduplicateRows,
  getExistingGeneratedAt,
  normalizeAnalyticsCatalogContent,
  readFileIfExists,
  sortRows,
  writeFileIfChanged,
} from './lib/catalog-output.mjs';
import { clientRoot, filePaths } from './lib/config.mjs';
import { parseEventDefinitions } from './lib/event-parser.mjs';
import {
  buildRouteEntries,
  parseLayoutFreeRouteMap,
  parseLazyRouteMap,
  parseRoutePathMap,
} from './lib/route-parser.mjs';
import { buildImportGraph, parseUsageByFile } from './lib/usage-scanner.mjs';

function buildAnalyticsCatalogRows(allClientFiles) {
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

  return sortRows(deduplicateRows(rows));
}

function syncAnalyticsCatalogOutputs(rows) {
  const nextGeneratedAt = new Date().toISOString();
  const currentAnalyticsCatalogContent = readFileIfExists(
    filePaths.analyticsCatalogOutput,
  );
  const draftAnalyticsCatalogContent = createAnalyticsCatalogFileContent({
    generatedAt: nextGeneratedAt,
    rows,
  });
  const nextCsvContent = createCsvContent(rows);
  const showKeepExistingGeneratedAt =
    currentAnalyticsCatalogContent !== null &&
    normalizeAnalyticsCatalogContent(currentAnalyticsCatalogContent) ===
      normalizeAnalyticsCatalogContent(draftAnalyticsCatalogContent);
  const generatedAt = showKeepExistingGeneratedAt
    ? (getExistingGeneratedAt(currentAnalyticsCatalogContent) ??
      nextGeneratedAt)
    : nextGeneratedAt;
  const nextAnalyticsCatalogContent = createAnalyticsCatalogFileContent({
    generatedAt,
    rows,
  });
  const showAnalyticsCatalogUpdated = writeFileIfChanged(
    filePaths.analyticsCatalogOutput,
    nextAnalyticsCatalogContent,
  );
  const showCsvUpdated = writeFileIfChanged(
    filePaths.analyticsCsvOutput,
    nextCsvContent,
  );

  if (!showAnalyticsCatalogUpdated && !showCsvUpdated) {
    console.log('analytics catalog이 이미 최신 상태예요.');
    return;
  }

  console.log(
    `Generated analytics catalog from code with ${rows.length} rows at ${generatedAt}`,
  );
}

function main() {
  const allClientFiles = walkFiles(clientRoot);
  const rows = buildAnalyticsCatalogRows(allClientFiles);

  syncAnalyticsCatalogOutputs(rows);
}

try {
  main();
} catch (error) {
  console.error('Failed to generate analytics catalog from code.');
  throw error;
}
