import { ToastEvent, ToastProps, ToastType } from '../types/type';
import { eventManager } from './eventManager';

type ToastAddFunctionProps = Omit<ToastProps, 'toastId' | 'type'>;
type ToastOptions = Omit<ToastProps, 'toastId' | 'type' | 'text'>;
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(4);
};

const emitAddToast = (type: ToastType, toastProps: ToastAddFunctionProps) => {
  const id = generateUniqueId();
  eventManager.emit(ToastEvent.Add, {
    ...toastProps,
    toastId: id,
    type,
  });
  return id;
};

export const toast = {
  default: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('default', { text: text, ...toastOptions }),
  success: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('success', { text: text, ...toastOptions }),
};
