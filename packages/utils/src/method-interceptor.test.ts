import { OnError, onError, OnSuccess, onSuccess } from './method-interceptor';

describe('method interceptor', () => {
  it('OnSuccess는 동기 메서드 성공 결과를 처리해야 한다', () => {
    const results: number[] = [];

    class Counter {
      value = 1;

      @OnSuccess((result: number) => {
        results.push(result);
      })
      increase(step: number) {
        this.value += step;

        return this.value;
      }
    }

    const counter = new Counter();

    expect(counter.increase(2)).toBe(3);
    expect(results).toEqual([3]);
  });

  it('OnSuccess는 비동기 메서드 성공 결과를 처리해야 한다', async () => {
    const results: string[] = [];

    class PostService {
      @OnSuccess((result: string) => {
        results.push(result);
      })
      async create(title: string) {
        return `${title}-created`;
      }
    }

    const service = new PostService();

    await expect(service.create('post')).resolves.toBe('post-created');
    expect(results).toEqual(['post-created']);
  });

  it('OnError는 동기 메서드 에러를 처리한 뒤 다시 던져야 한다', () => {
    const errors: unknown[] = [];

    class FailingService {
      @OnError((error) => {
        errors.push(error);
      })
      remove() {
        throw new Error('remove failed');
      }
    }

    const service = new FailingService();

    expect(() => service.remove()).toThrow('remove failed');
    expect(errors).toHaveLength(1);
  });

  it('OnError는 비동기 메서드 에러를 처리한 뒤 다시 던져야 한다', async () => {
    const errors: unknown[] = [];

    class FailingService {
      @OnError((error) => {
        errors.push(error);
      })
      async remove() {
        throw new Error('remove failed');
      }
    }

    const service = new FailingService();

    await expect(service.remove()).rejects.toThrow('remove failed');
    expect(errors).toHaveLength(1);
  });

  it('함수형 래퍼도 같은 방식으로 동작해야 한다', async () => {
    const results: string[] = [];
    const errors: unknown[] = [];

    const save = onSuccess((result: string) => {
      results.push(result);
    })(async (title: string) => `${title}-saved`);

    const remove = onError((error) => {
      errors.push(error);
    })(async () => {
      throw new Error('remove failed');
    });

    await expect(save('post')).resolves.toBe('post-saved');
    await expect(remove()).rejects.toThrow('remove failed');
    expect(results).toEqual(['post-saved']);
    expect(errors).toHaveLength(1);
  });
});
