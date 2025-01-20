import { AxiosError } from 'axios';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

/**
 * Query 에서 발생하는 기본적인 에러를 AxiosError 타입으로 설정함
 */
