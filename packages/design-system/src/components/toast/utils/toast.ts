import { ToastEvent, ToastProps } from '../types';
import { eventManager } from './eventManager';

type ToastOptions = Omit<ToastProps, 'toastId' | 'type'>;

const emitAddToast = (toastProps: ToastOptions) => {
  const id = crypto.randomUUID();
  eventManager.emit(ToastEvent.Add, {
    ...toastProps,
    toastId: id,
  });
  return id;
};

export const toast = (options: ToastOptions) => emitAddToast(options);
