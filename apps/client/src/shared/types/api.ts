export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type BaseResponseWithoutData = Omit<BaseResponse<unknown>, 'data'>;
