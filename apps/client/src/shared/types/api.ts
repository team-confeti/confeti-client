export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export interface ErrorResponse {
  message?: string;
  code?: number;
}

export type BaseResponseWithoutData = Omit<BaseResponse<unknown>, 'data'>;
