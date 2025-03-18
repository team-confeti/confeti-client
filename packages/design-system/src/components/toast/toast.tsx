import { useEffect, useRef, useState } from 'react';

import { IcToastInfo24 } from '../../icons/src';
import { ToastEvent, ToastProps } from './types/type';
import { eventManager } from './utils/eventManager';

import * as styles from './toast.css';

const Toast = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  position = 'bottomCenter',
}: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleAnimationEnd = () => {
    if (isExiting) {
      eventManager.emit(ToastEvent.Delete, toastId);
    }
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  return (
    <div
      ref={toastRef}
      className={styles.toast({
        position,
        animation: isExiting ? 'exit' : 'enter',
      })}
      onClick={() => closeOnClick && setIsExiting(true)}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.content}>
        <IcToastInfo24 className={styles.icon} />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Toast;
