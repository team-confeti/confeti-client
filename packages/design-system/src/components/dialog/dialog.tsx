import { ReactNode, useRef } from 'react';

import useClickOutside from '../../hooks/use-click-outside';
import { cn } from '../../utils';

import * as styles from './dialog.css';

interface RootProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  className?: string;
  backDrop?: boolean;
}

interface ChildrenProps {
  children: ReactNode;
}

const DialogRoot = ({
  children,
  open,
  handleClose,
  backDrop = true,
  ...props
}: RootProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handleClose);

  return (
    <dialog
      className={styles.backDropStyle({ backDrop: backDrop })}
      open={open}
      {...props}
    >
      <div ref={ref} className={cn(styles.rootStyle)}>
        {children}
      </div>
    </dialog>
  );
};

const DialogContent = ({ children }: ChildrenProps) => {
  return <div className={styles.contentStyle}>{children}</div>;
};

const DialogTitle = ({ children }: ChildrenProps) => {
  return <h2 className={styles.titleStyle}>{children}</h2>;
};

const DialogDescription = ({ children }: ChildrenProps) => {
  return <p className={styles.descriptionStyle}>{children}</p>;
};

const DialogAction = ({ children }: ChildrenProps) => {
  return <div className={styles.actionStyle}>{children}</div>;
};

const Dialog = Object.assign(DialogRoot, {
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Action: DialogAction,
});

export default Dialog;
