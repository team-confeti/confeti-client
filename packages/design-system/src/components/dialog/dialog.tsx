import { ReactNode } from 'react';

import { cn } from '../../utils';

import * as styles from './dialog.css';

type RootProps = {
  children: ReactNode;
  open: boolean;
  className?: string;
  backDrop?: boolean;
};

type ContentProps = {
  children: ReactNode;
};

type TitleProps = {
  children: ReactNode;
};

type DescriptionProps = {
  children: ReactNode;
};

type ActionProps = {
  children: ReactNode;
  onClick?: () => void;
};

const DialogRoot = ({
  children,
  open,
  backDrop = true,
  ...props
}: RootProps) => {
  if (!open) {
    return null;
  } else {
    return (
      <div className={styles.backDropStyle({ backDrop: backDrop })} {...props}>
        <div className={cn(styles.rootStyle)}>{children}</div>
      </div>
    );
  }
};

const DialogContent = ({ children }: ContentProps) => {
  return <div className={styles.contentStyle}>{children}</div>;
};

const DialogTitle = ({ children }: TitleProps) => {
  return <h1 className={styles.titleStyle}>{children}</h1>;
};

const DialogDescription = ({ children }: DescriptionProps) => {
  return <p className={styles.descriptionStyle}>{children}</p>;
};

const DialogAction = ({ children, onClick }: ActionProps) => {
  return (
    <div className={styles.actionStyle} onClick={onClick}>
      {children}
    </div>
  );
};

const Dialog = Object.assign(DialogRoot, {
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Action: DialogAction,
});

export default Dialog;
