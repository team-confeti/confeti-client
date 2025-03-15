import * as Sentry from '@sentry/react';
import { HTTP_STATUS_CODE } from '@shared/constants/api';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { HTTPError } from './http-error';
import { ACCESS_TOKEN_KEY } from '@shared/constants/user-constants';
import { routePath } from '@shared/constants/path';

interface ErrorResponse {
  message?: string;
  code?: number;
}

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    Sentry.withScope((scope) => {
      scope.setLevel('fatal');
      scope.setTag('error_type', 'network_error');
      scope.captureMessage(`[네트워크 오류] ${window.location.href}`);
    });

    throw new HTTPError(0, '네트워크 오류 발생');
  }

  const { config, response } = error;
  const { data, status } = response;

  Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setTag('error_type', 'api_error');
    scope.setTag('API URL', config?.url || 'unknown');
    scope.setTag('HTTP Method', config?.method || 'unknown');
    scope.setTag('Status Code', status.toString());
    scope.captureMessage(`[API 오류] ${window.location.href}`);
  });

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }

  throw new HTTPError(status, data.message);
};

export const handleCheckAndSetToken = (config: InternalAxiosRequestConfig) => {
  if (!config || !config.headers || config.headers.Authorization) return config;
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    window.location.replace(routePath.ROOT);
    throw new Error('액세스 토큰이 존재하지 않습니다.');
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
