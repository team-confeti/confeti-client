import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export type { AxiosError, InternalAxiosRequestConfig };

export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export interface ErrorResponse {
  message?: string;
  code?: number;
}
