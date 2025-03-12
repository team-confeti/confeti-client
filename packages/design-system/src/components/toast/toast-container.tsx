import { memo, useMemo } from 'react';
import Toast from './toast';
import { useToastContainer } from './hooks/useToastContainer';
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
        <Toast key={toastProps.toastId} {...toastProps} />
      ))}
    </div>
  ));
};

export default memo(ToastContainer);
