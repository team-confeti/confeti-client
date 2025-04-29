import * as Sentry from '@sentry/react';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { CONFIG, END_POINT, HTTP_STATUS_CODE } from '@shared/constants/api';
import { routePath } from '@shared/constants/path';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@shared/constants/user-constants';
import { BaseResponse, ErrorResponse } from '@shared/types/api';
import { TokenResponse } from '@shared/types/login-response';
import { authTokenHandler } from '@shared/utils/token-handler';

import { HTTPError } from './http-error';
import { axiosInstance } from './instance';

const redirectToHome = () => {
  authTokenHandler('remove');
  window.location.replace(routePath.ROOT);
  throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
};

export const handleAPIError = async (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    Sentry.captureException(error, {
      level: 'fatal',
      tags: {
        error_type: 'network_error',
        url: window.location.href,
      },
    });

    throw new HTTPError(0, '네트워크 연결에 실패했습니다.');
  }

  const { config, response } = error;
  const { data, status } = response;

  Sentry.captureException(error, {
    level: 'error',
    tags: {
      error_type: 'api_error',
      url: config?.url || 'unknown',
      method: config?.method || 'unknown',
      status_code: status.toString(),
    },
  });

  switch (status) {
    case HTTP_STATUS_CODE.UNAUTHORIZED:
      try {
        return await handleTokenError(error);
      } catch (tokenError) {
        throw new HTTPError(status, '인증 토큰 갱신에 실패했습니다.');
      }

    case HTTP_STATUS_CODE.NOT_FOUND:
      throw new HTTPError(status, '요청하신 리소스를 찾을 수 없습니다.');

    default:
      if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        throw new HTTPError(status, '서버 내부 오류가 발생했습니다.');
      }
      throw new HTTPError(
        status,
        data?.message || '알 수 없는 오류가 발생했습니다.',
      );
  }
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  if (!error.config) {
    throw new Error('요청 정보를 확인할 수 없습니다.');
  }

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    return redirectToHome();
  }

  try {
    const response = await fetch(
      `${CONFIG.BASE_URL}${END_POINT.POST_REISSUE_TOKEN}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) throw new Error('토큰 재발급 실패');

    const result: BaseResponse<TokenResponse> = await response.json();
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      result.data;

    authTokenHandler('set', newAccessToken, newRefreshToken);

    const originalConfig = error.config;
    originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return axiosInstance(originalConfig);
  } catch (err) {
    return redirectToHome();
  }
};

export const handleCheckAndSetToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};
