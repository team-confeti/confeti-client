import { generatePath } from 'react-router-dom';

import { type Routes } from '@shared/router/path';

export function buildPath<P extends Routes>(
  ...args: Parameters<typeof generatePath<P>>
): string {
  return generatePath(...args);
}
