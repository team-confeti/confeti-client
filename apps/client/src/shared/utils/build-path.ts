import { generatePath, type PathParam } from 'react-router-dom';

import { type Routes } from '@shared/router/path';

export const buildPath = <P extends Routes>(
  path: P,
  params: { [key in PathParam<P>]: string | number },
): string => {
  const convertedParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      acc[key as PathParam<P>] = String(value);
      return acc;
    },
    {} as { [key in PathParam<P>]: string },
  );

  return generatePath(path, convertedParams);
};
