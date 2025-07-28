import { HTTP_STATUS_CODE } from './constants';
import { HTTPError } from './http-error';

describe('HTTPError Class', () => {
  describe('생성자', () => {
    it('기본적인 HTTPError 인스턴스를 생성할 수 있어야 한다', () => {
      const error = new HTTPError(400, '잘못된 요청입니다');

      expect(error).toBeInstanceOf(HTTPError);
      expect(error).toBeInstanceOf(Error);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('잘못된 요청입니다');
      expect(error.name).toBe('HTTPError: BAD_REQUEST');
    });

    it('statusCode만으로도 HTTPError를 생성할 수 있어야 한다', () => {
      const error = new HTTPError(500);

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('');
      expect(error.name).toBe('HTTPError: INTERNAL_SERVER_ERROR');
    });

    it('code 파라미터를 포함하여 HTTPError를 생성할 수 있어야 한다', () => {
      const error = new HTTPError(400, '잘못된 요청입니다', 1001);

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('잘못된 요청입니다');
      expect(error.code).toBe(1001);
      expect(error.name).toBe('HTTPError: BAD_REQUEST');
    });
  });

  describe('에러 이름 설정', () => {
    it('400 상태 코드에 대해 올바른 에러 이름을 설정해야 한다', () => {
      const error = new HTTPError(HTTP_STATUS_CODE.BAD_REQUEST);
      expect(error.name).toBe('HTTPError: BAD_REQUEST');
    });

    it('401 상태 코드에 대해 올바른 에러 이름을 설정해야 한다', () => {
      const error = new HTTPError(HTTP_STATUS_CODE.UNAUTHORIZED);
      expect(error.name).toBe('HTTPError: UNAUTHORIZED');
    });

    it('404 상태 코드에 대해 올바른 에러 이름을 설정해야 한다', () => {
      const error = new HTTPError(HTTP_STATUS_CODE.NOT_FOUND);
      expect(error.name).toBe('HTTPError: NOT_FOUND');
    });

    it('409 상태 코드에 대해 올바른 에러 이름을 설정해야 한다', () => {
      const error = new HTTPError(HTTP_STATUS_CODE.CONFLICT);
      expect(error.name).toBe('HTTPError: CONFLICT');
    });

    it('500 상태 코드에 대해 올바른 에러 이름을 설정해야 한다', () => {
      const error = new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
      expect(error.name).toBe('HTTPError: INTERNAL_SERVER_ERROR');
    });

    it('알 수 없는 상태 코드에 대해 상태 코드를 포함한 에러 이름을 설정해야 한다', () => {
      const error = new HTTPError(418);
      expect(error.name).toBe('HTTPError: 418');
    });
  });

  describe('에러 속성', () => {
    it('statusCode 속성이 올바르게 설정되어야 한다', () => {
      const error = new HTTPError(404, '리소스를 찾을 수 없습니다');
      expect(error.statusCode).toBe(404);
    });

    it('message 속성이 올바르게 설정되어야 한다', () => {
      const error = new HTTPError(500, '서버 내부 오류가 발생했습니다');
      expect(error.message).toBe('서버 내부 오류가 발생했습니다');
    });

    it('code 속성이 올바르게 설정되어야 한다', () => {
      const error = new HTTPError(400, '잘못된 요청', 1001);
      expect(error.code).toBe(1001);
    });

    it('code 속성이 undefined일 수 있어야 한다', () => {
      const error = new HTTPError(500, '서버 오류');
      expect(error.code).toBeUndefined();
    });
  });

  describe('실제 사용 시나리오', () => {
    it('API 응답에서 에러를 던질 때 사용할 수 있어야 한다', () => {
      const throwError = () => {
        throw new HTTPError(401, '인증이 필요합니다');
      };

      expect(throwError).toThrow(HTTPError);
      expect(throwError).toThrow('인증이 필요합니다');
    });

    it('try-catch 블록에서 에러를 처리할 수 있어야 한다', () => {
      try {
        throw new HTTPError(404, '페이지를 찾을 수 없습니다');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        if (error instanceof HTTPError) {
          expect(error.statusCode).toBe(404);
          expect(error.message).toBe('페이지를 찾을 수 없습니다');
        }
      }
    });
  });
});
