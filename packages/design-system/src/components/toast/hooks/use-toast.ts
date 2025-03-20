import { useEffect, useState } from 'react';

import { ToastEvent } from '../types';
import { eventManager } from '../utils/event-manager';

export const useToast = (
  toastId: string,
  autoClose?: number | false,
  closeOnClick = true,
) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => setIsExiting(true), autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleAnimationEnd = () => {
    if (isExiting) {
      eventManager.emit(ToastEvent.Delete, toastId);
    }
  };

  const handleClick = () => {
    if (closeOnClick) setIsExiting(true);
  };

  return { isExiting, handleAnimationEnd, handleClick };
};
