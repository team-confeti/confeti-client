import {
  IcTimetableFloatClose,
  IcFloatEditLime24,
  IcFloatEdit24,
  IcFloatDelete24,
  IcTimetableFloatFinish,
} from '@confeti/design-system/icons';
import useDisableScroll from '@pages/time-table/hooks/use-disabled-scroll';
import { useScrollPosition } from '@pages/time-table/hooks/use-scroll-position';
import { EDIT_BOX, EDIT_BUTTON } from '../../constants/edit-floating-text';
import * as styles from './edit-floating-button.css';

interface EditFloatingButtonProps {
  isEditMode: boolean;
  isEditTimeTableMode: boolean;
  isFestivalDeleteMode: boolean;
  isTextVisible: boolean;
  onToggleEditMode: () => void;
  onToggleEditTimeTableMode: () => void;
  onToggleFestivalDeleteMode: () => void;
  onToggleTextVisibility: (visible: boolean) => void;
  onResetModes: () => void;
}

const EditFloatingButton = ({
  isEditMode,
  isEditTimeTableMode,
  isFestivalDeleteMode,
  isTextVisible,
  onToggleEditMode,
  onToggleEditTimeTableMode,
  onToggleFestivalDeleteMode,
  onToggleTextVisibility,
  onResetModes,
}: EditFloatingButtonProps) => {
  const isAtBottom = useScrollPosition();
  const adjustedAtBottom =
    isEditTimeTableMode || isFestivalDeleteMode ? false : isAtBottom;
  useDisableScroll(isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode);

  const handleToggleButton = () => {
    onToggleEditMode();
    onToggleTextVisibility(true);
    if (isEditTimeTableMode || isFestivalDeleteMode) onResetModes();
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
        text: EDIT_BUTTON.COMPLETE,
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
      text: EDIT_BUTTON.EDIT,
      onClick: handleToggleButton,
    });
  };

  interface RenderActionButtonProps {
    variant: 'close' | 'edit' | 'complete';
    icon: JSX.Element;
    text: string | null;
    onClick: () => void;
  }

  const renderActionButton = ({
    variant,
    icon,
    text,
    onClick,
  }: RenderActionButtonProps) => (
    <button
      className={styles.buttonVariants({
        variant,
        isAtBottom: adjustedAtBottom,
      })}
      onClick={onClick}
    >
      {icon}
      {text && (
        <span
          className={`${styles.text} ${
            isTextVisible ? styles.textVisible : styles.textHidden
          }`}
        >
          {text}
        </span>
      )}
    </button>
  );

  const renderActionButtons = () => {
    if (isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode) {
      return (
        <div
          className={`${styles.box} ${adjustedAtBottom ? styles.boxAtBottom : ''}`}
        >
          <button
            onClick={onToggleEditTimeTableMode}
            className={styles.boxButton}
          >
            <IcFloatEdit24 width="2.4rem" height="2.4rem" />
            <span>{EDIT_BOX.EDIT_TIMETABLE}</span>
          </button>
          <button
            onClick={onToggleFestivalDeleteMode}
            className={styles.boxButton}
          >
            <IcFloatDelete24 width="2.4rem" height="2.4rem" />
            <span>{EDIT_BOX.DELETE_FESTIVAL}</span>
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode && (
        <div className={getBackgroundClassName()} />
      )}
      {renderActionButtons()}
      {renderButton()}
    </>
  );
};

export default EditFloatingButton;
