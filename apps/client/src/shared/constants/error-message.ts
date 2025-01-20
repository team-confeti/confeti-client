export const ERROR_MESSAGE: Record<
  number,
  Record<number | 'default', string>
> = {
  400: {
    default: '요청 형식이 올바르지 않습니다.',
  },
  401: {
    default: '사용자의 로그인 검증을 실패했습니다.',
  },
  404: {
    default: '요청한 리소스가 존재하지 않습니다.',
  },
  405: {
    default: '허용되지 않는 HTTP Method입니다',
  },
  409: {
    default: '이미 존재하는 리소스입니다.',
  },
  500: {
    default: '서버 오류가 발생했습니다',
  },
};
