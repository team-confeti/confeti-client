import { memo, useMemo } from 'react';

import { useToastContainer } from './hooks/use-toast-container';
import Toast from './toast';

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
