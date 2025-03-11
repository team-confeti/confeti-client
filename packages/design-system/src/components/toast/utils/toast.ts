import { ToastEvent, ToastProps } from '../types';
import { eventManager } from './eventManager';

type ToastOptions = Omit<ToastProps, 'toastId'>;

const emitAddToast = (toastProps: ToastOptions) => {
  const id = crypto.randomUUID();

  eventManager.emit(ToastEvent.Add, {
    ...toastProps,
    toastId: id,
  });
  return id;
};

/**
 * 토스트 메시지를 생성하는 함수.
 *
 * @param {ToastOptions | string} options - 토스트 옵션 객체 또는 문자열 메시지
 *   - 문자열이 전달되면 `{ text: options }` 형태로 변환됨
 * @returns {string} 생성된 토스트의 ID
 *
 * @example
 * // 문자열을 전달하면 기본 옵션과 함께 토스트 생성
 * toast('Hello, world!');
 * // 내부적으로 { text: "Hello, world!" } 로 변환 후 emitAddToast 호출
 */
export const toast = (options: ToastOptions | string): string => {
  const toastOptions: ToastOptions =
    typeof options === 'string' ? { text: options } : options;

  return emitAddToast(toastOptions);
};
