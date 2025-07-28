import { HTTP_STATUS_CODE } from './constants';

/**
 * HTTP 통신 중 발생할 수 있는 에러를 나타내는 커스텀 에러 클래스입니다.
 *
 * 상태 코드에 따라 에러 이름(`name`)이 자동으로 설정되며,
 * 선택적으로 서버에서 내려주는 도메인 에러 코드(`code`)도 포함할 수 있습니다.
 */
export class HTTPError extends Error {
  statusCode: number;
  code?: number;

  /**
   * HTTPError 인스턴스를 생성합니다.
   *
   * @param statusCode - HTTP 상태 코드
   * @param message - 에러 메시지 (optional)
   * @param code - 도메인 에러 코드 (optional)
   */
  constructor(statusCode: number, message?: string, code?: number) {
    super(message);
    let name = 'HTTPError';

    switch (statusCode) {
      case HTTP_STATUS_CODE.BAD_REQUEST: {
        name += ': BAD_REQUEST';
        break;
      }
      case HTTP_STATUS_CODE.UNAUTHORIZED: {
        name += ': UNAUTHORIZED';
        break;
      }
      case HTTP_STATUS_CODE.NOT_FOUND: {
        name += ': NOT_FOUND';
        break;
      }
      case HTTP_STATUS_CODE.CONFLICT: {
        name += ': CONFLICT';
        break;
      }
      case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
        name += ': INTERNAL_SERVER_ERROR';
        break;
      }
      default: {
        name += `: ${statusCode}`;
        break;
      }
    }

    this.name = name;
    this.statusCode = statusCode;
    this.code = code;
  }
}
