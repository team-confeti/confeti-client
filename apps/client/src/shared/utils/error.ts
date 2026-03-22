import { HTTPError } from '@confeti/core/http';

export const isHTTPErrorStatus = (
  error: unknown,
  statusCode: number,
): boolean => {
  if (!(error instanceof HTTPError)) {
    return false;
  }

  return error.statusCode === statusCode;
};
