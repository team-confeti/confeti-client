import { HTTP_STATUS_CODE } from '@shared/constants/api';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { HTTPError } from './http-error';
import { USER_ID_KEY } from '@shared/constants/user-constants';

interface ErrorResponse {
  message?: string;
  code?: number;
}

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) throw error;

  const { data, status } = error.response;

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }

  throw new HTTPError(status, data.message);
};

export const handleCheckAndSetToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(USER_ID_KEY);

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
};
