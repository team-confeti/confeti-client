import { useState } from 'react';

import {
  IcTimetableFloatClose,
  IcFloatEditLime24,
  IcFloatEdit24,
  IcFloatDelete24,
  IcTimetableFloatFinish,
} from '@confeti/design-system/icons';
import * as styles from './edit-floating-button.css';

type ModeSetter = React.Dispatch<React.SetStateAction<boolean>>;

interface RenderActionButtonProps {
  variant: 'close' | 'edit' | 'complete';
  icon: JSX.Element;
  text: string | null;
  onClick: () => void;
}

const EditFloatingButton = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditTimeTableMode, setIsEditTimeTableMode] = useState(false);
  const [isFestivalDeleteMode, setIsFestivalDeleteMode] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);

  const resetModes = () => {
    setIsEditTimeTableMode(false);
    setIsFestivalDeleteMode(false);
  };

  const handleToggleButton = () => {
    setIsEditMode((prev) => !prev);
    setIsTextVisible(true);
    if (isEditTimeTableMode || isFestivalDeleteMode) resetModes();
  };

  const handleModeToggle = (modeSetter: ModeSetter): void => {
    modeSetter((prev: boolean) => !prev);
  };

  const getBackgroundClassName = () => {
    return `${styles.background} ${
      isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode
        ? styles.backgroundVisible
        : ''
    }`;
  };

  const renderButton = () => {
    if (isEditMode && (isEditTimeTableMode || isFestivalDeleteMode)) {
      return renderActionButton({
        variant: 'complete',
        icon: <IcTimetableFloatFinish width="2.4rem" height="2.4rem" />,
        text: '완료하기',
        onClick: handleToggleButton,
      });
    }

    if (isEditMode) {
      return renderActionButton({
        variant: 'close',
        icon: <IcTimetableFloatClose width="2.4rem" height="2.4rem" />,
        text: null,
        onClick: handleToggleButton,
      });
    }

    return renderActionButton({
      variant: 'edit',
      icon: <IcFloatEditLime24 width="2.4rem" height="2.4rem" />,
      text: '편집하기',
      onClick: handleToggleButton,
    });
  };

  const renderActionButton = ({
    variant,
    icon,
    text,
    onClick,
  }: RenderActionButtonProps) => (
    <button className={styles.buttonVariants({ variant })} onClick={onClick}>
      {icon}
      {text && (
        <span
          className={`${styles.text} ${isTextVisible ? styles.textVisible : styles.textHidden}`}
        >
          {text}
        </span>
      )}
    </button>
  );

  const renderActionButtons = () => {
    if (isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode) {
      return (
        <div className={styles.box}>
          <button
            onClick={() => handleModeToggle(setIsEditTimeTableMode)}
            className={styles.boxButton}
          >
            <IcFloatEdit24 width="2.4rem" height="2.4rem" />
            <span>타임테이블 편집</span>
          </button>
          <button
            onClick={() => handleModeToggle(setIsFestivalDeleteMode)}
            className={styles.boxButton}
          >
            <IcFloatDelete24 width="2.4rem" height="2.4rem" />
            <span>페스티벌 삭제</span>
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={getBackgroundClassName()} />
      {renderActionButtons()}
      {renderButton()}
    </>
  );
};

export default EditFloatingButton;
