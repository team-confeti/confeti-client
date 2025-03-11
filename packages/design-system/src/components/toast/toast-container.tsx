import { memo, useMemo } from 'react';
import useToastContainer from './hooks/useToastContainer';
import ToastItem from './toast';
import * as styles from './toast-container.css';

const ToastContainer = () => {
  const { getToastPositionGroupToRender } = useToastContainer();
  const positionGroup = useMemo(
    () => getToastPositionGroupToRender(),
    [getToastPositionGroupToRender],
  );

  return Array.from(positionGroup).map(([position, toasts]) => (
    <div
      key={position}
      className={`${styles.container} ${styles.toastPositionStyle({ position })}`}
    >
      {toasts.map((toastProps) => (
        <ToastItem key={toastProps.toastId} {...toastProps} />
      ))}
    </div>
  ));
};

export default memo(ToastContainer);
