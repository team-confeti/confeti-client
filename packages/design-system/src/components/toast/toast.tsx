import { useState, useEffect } from 'react';

import { ToastProps, ToastEvent } from './types';
import { eventManager } from './utils/eventManager';
import { TOAST_DEFAULT_POSITION } from './utils/constants';
import { IcToastInfo24 } from '../../icons/src';
import { cn } from '../../utils';
import * as styles from './toast.css';

const Toast = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  position = TOAST_DEFAULT_POSITION,
  icon,
  className,
}: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const isTopPosition = position.startsWith('top');

  const handleAnimationEnd = () => {
    if (isExiting) {
      eventManager.emit(ToastEvent.Delete, toastId);
    }
  };

  const renderIcon = () => {
    switch (icon) {
      case 'default':
        return <IcToastInfo24 width={'2.4rem'} height={'2.4rem'} />;
      case undefined:
        return null;
      default:
        return icon;
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
      className={cn(
        styles.toastVariants({
          isTopPosition,
          animation: isExiting ? 'exit' : 'enter',
        }),
        className,
      )}
      onClick={() => closeOnClick && setIsExiting(true)}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.content}>
        {renderIcon()}
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Toast;
