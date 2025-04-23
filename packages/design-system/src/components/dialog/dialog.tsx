import { type ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import useClickOutside from '../../hooks/use-click-outside';
import { themeClass } from '../../styles';
import { cn } from '../../utils';

import * as styles from './dialog.css';

interface RootProps {
  children: ReactNode;
  open: boolean;
  handleClose?: () => void;
  className?: string;
  backDrop?: boolean;
}

interface ChildrenProps {
  children: ReactNode;
}

type DialogRootComponent = (props: RootProps) => JSX.Element | null;
type DialogChildComponent = (props: ChildrenProps) => JSX.Element;

interface DialogComposite extends DialogRootComponent {
  Content: DialogChildComponent;
  Title: DialogChildComponent;
  Description: DialogChildComponent;
  Action: DialogChildComponent;
}
const DialogRoot = ({
  children,
  open,
  handleClose,
  backDrop = true,
  ...props
}: RootProps) => {
  const ref = useRef<HTMLDivElement>(null);
  if (handleClose) {
    useClickOutside(ref, handleClose);
  }

  if (!open) return null;
  return createPortal(
    <div className={themeClass}>
      <div
        className={cn(styles.backDropStyle({ backDrop: backDrop }), themeClass)}
        {...props}
      >
        <div
          ref={ref}
          className={cn(styles.rootStyle)}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
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
}) as DialogComposite;

export default Dialog;
