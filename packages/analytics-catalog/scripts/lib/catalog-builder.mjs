import path from 'node:path';

import { clientRoot, filePaths } from './config.mjs';

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

function toRelativeClientPath(filePath) {
  return path.relative(clientRoot, filePath).replaceAll(path.sep, '/');
}

export function buildRouteReachableFilesMap(importGraph, routeEntries) {
  return new Map(
    routeEntries.map((routeEntry) => [
      routeEntry.path,
      findReachableFiles(importGraph, routeEntry.files),
    ]),
  );
}

export function buildRouteCountByFile(routeReachableFilesMap) {
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

export function buildPageShowEventsByFile(usageByFile, showEventMap) {
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

export function buildCatalogRows({
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
        });
      });
    });
  });

  return rows;
}
