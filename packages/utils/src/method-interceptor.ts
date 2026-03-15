function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'then' in value &&
    typeof value.then === 'function'
  );
}

interface OnSuccessDecorator<TResult> {
  <TThis, TArgs extends unknown[]>(
    method: (this: TThis, ...args: TArgs) => Promise<TResult>,
    context: ClassMethodDecoratorContext<
      TThis,
      (this: TThis, ...args: TArgs) => Promise<TResult>
    >,
  ): (this: TThis, ...args: TArgs) => Promise<TResult>;
  <TThis, TArgs extends unknown[]>(
    method: (this: TThis, ...args: TArgs) => TResult,
    context: ClassMethodDecoratorContext<
      TThis,
      (this: TThis, ...args: TArgs) => TResult
    >,
  ): (this: TThis, ...args: TArgs) => TResult;
}

interface OnErrorDecorator {
  <TThis, TArgs extends unknown[], TResult>(
    method: (this: TThis, ...args: TArgs) => Promise<TResult>,
    context: ClassMethodDecoratorContext<
      TThis,
      (this: TThis, ...args: TArgs) => Promise<TResult>
    >,
  ): (this: TThis, ...args: TArgs) => Promise<TResult>;
  <TThis, TArgs extends unknown[], TResult>(
    method: (this: TThis, ...args: TArgs) => TResult,
    context: ClassMethodDecoratorContext<
      TThis,
      (this: TThis, ...args: TArgs) => TResult
    >,
  ): (this: TThis, ...args: TArgs) => TResult;
}

interface OnSuccessWrapper<TResult> {
  <TThis, TArgs extends unknown[]>(
    method: (this: TThis, ...args: TArgs) => Promise<TResult>,
  ): (this: TThis, ...args: TArgs) => Promise<TResult>;
  <TThis, TArgs extends unknown[]>(
    method: (this: TThis, ...args: TArgs) => TResult,
  ): (this: TThis, ...args: TArgs) => TResult;
}

interface OnErrorWrapper {
  <TThis, TArgs extends unknown[], TResult>(
    method: (this: TThis, ...args: TArgs) => Promise<TResult>,
  ): (this: TThis, ...args: TArgs) => Promise<TResult>;
  <TThis, TArgs extends unknown[], TResult>(
    method: (this: TThis, ...args: TArgs) => TResult,
  ): (this: TThis, ...args: TArgs) => TResult;
}

export function onSuccess<TResult>(
  handler: (result: TResult) => void,
): OnSuccessWrapper<TResult>;
export function onSuccess(handler: (result: unknown) => void): unknown {
  return function (method: (this: unknown, ...args: unknown[]) => unknown) {
    return function (this: unknown, ...args: unknown[]) {
      const result = method.apply(this, args);

      if (isPromiseLike(result)) {
        return Promise.resolve(result).then((value) => {
          handler(value);

          return value;
        });
      }

      handler(result);

      return result;
    };
  };
}

export function OnSuccess<TResult>(
  handler: (result: TResult) => void,
): OnSuccessDecorator<TResult>;
export function OnSuccess<TResult>(handler: (result: TResult) => void): unknown;
export function OnSuccess(handler: (result: unknown) => void): unknown {
  return function (
    method: (this: unknown, ...args: unknown[]) => unknown,
    _context: ClassMethodDecoratorContext,
  ) {
    return function (this: unknown, ...args: unknown[]) {
      const result = method.apply(this, args);

      if (isPromiseLike(result)) {
        return Promise.resolve(result).then((value) => {
          handler(value);

          return value;
        });
      }

      handler(result);

      return result;
    };
  };
}

export function onError(handler: (error: unknown) => void): OnErrorWrapper;
export function onError(handler: (error: unknown) => void): unknown {
  return function (method: (this: unknown, ...args: unknown[]) => unknown) {
    return function (this: unknown, ...args: unknown[]) {
      try {
        const result = method.apply(this, args);

        if (isPromiseLike(result)) {
          return Promise.resolve(result).catch((error: unknown) => {
            handler(error);
            throw error;
          });
        }

        return result;
      } catch (error) {
        handler(error);
        throw error;
      }
    };
  };
}

export function OnError(handler: (error: unknown) => void): OnErrorDecorator;
export function OnError(handler: (error: unknown) => void): unknown {
  return function (
    method: (this: unknown, ...args: unknown[]) => unknown,
    _context: ClassMethodDecoratorContext,
  ) {
    return function (this: unknown, ...args: unknown[]) {
      try {
        const result = method.apply(this, args);

        if (isPromiseLike(result)) {
          return Promise.resolve(result).catch((error: unknown) => {
            handler(error);
            throw error;
          });
        }

        return result;
      } catch (error) {
        handler(error);
        throw error;
      }
    };
  };
}
