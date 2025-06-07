import {
  EDIT_BOX,
  EDIT_BUTTON,
} from '@pages/timetable/constants/edit-floating-text';
import useDisableScroll from '@pages/timetable/hooks/use-disabled-scroll';
import { useDeleteTimetableFestival } from '@pages/timetable/hooks/use-timetable-festival-mutation';

import {
  IcFloatDelete24,
  IcFloatEdit24,
  IcFloatEditLime24,
  IcTimetableFloatClose,
  IcTimetableFloatFinish,
} from '@confeti/design-system/icons';
import { useScrollAtBottom } from '@shared/hooks/use-scroll-position';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

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
  onToggleComplete: () => void;
  onResetModes: () => void;
  festivalsToDelete: number[];
  remainedFestival: FestivalTimetable[];
  handleFestivalClick: (festivalId: number, title: string) => void;
  selectedFestivalId?: number | null;
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
  onToggleComplete,
  onResetModes,
  festivalsToDelete,
  remainedFestival,
  handleFestivalClick,
  selectedFestivalId,
}: EditFloatingButtonProps) => {
  const deleteFestival = useDeleteTimetableFestival();
  const isAtBottom = useScrollAtBottom();
  const adjustedAtBottom =
    isEditTimeTableMode || isFestivalDeleteMode ? false : isAtBottom;
  useDisableScroll(isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode);

  const handleToggleButton = () => {
    if (isEditTimeTableMode || isFestivalDeleteMode) {
      const isSelectedFestivalDeleted = selectedFestivalId
        ? festivalsToDelete.includes(selectedFestivalId)
        : false;

      festivalsToDelete.map((id) => deleteFestival.mutate(id));

      if (isSelectedFestivalDeleted && remainedFestival.length > 0) {
        handleFestivalClick(remainedFestival[0].festivalId, '');
      }
      onResetModes();
    }

    onToggleEditMode();
    onToggleTextVisibility(true);
  };

  const getBackgroundClassName = () => {
    return ` ${
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
        onClick: () => {
          handleToggleButton();
          onToggleComplete();
        },
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
    icon: React.JSX.Element;
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

  const isBackgroundExist =
    isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode;

  return (
    <>
      {isBackgroundExist && <div className={getBackgroundClassName()} />}
      {renderActionButtons()}
      {renderButton()}
    </>
  );
};

export default EditFloatingButton;
