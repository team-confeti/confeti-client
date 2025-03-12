import { TOAST_DEFAULT_POSITION } from './utils/constants';
import { IcToastInfo24 } from '../../icons/src';
import { cn } from '../../utils';
import { ToastProps } from './types';
import { useToast } from './hooks/useToast';
import * as styles from './toast.css';

const Toast = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  position = TOAST_DEFAULT_POSITION,
  icon,
  className,
  highlightText,
}: ToastProps) => {
  const { isExiting, handleAnimationEnd, handleClick } = useToast(
    toastId,
    autoClose,
    closeOnClick,
  );

  const isTopPosition = position.startsWith('top');

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

  return (
    <div
      className={cn(
        styles.toastVariants({
          isTopPosition,
          animation: isExiting ? 'exit' : 'enter',
        }),
        className,
      )}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.content}>
        {renderIcon()}
        <p className={styles.text}>
          <span className={styles.highlightText}>{highlightText}</span>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Toast;
