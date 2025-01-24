import {
  IcTimetableFloatClose,
  IcFloatEditLime24,
  IcFloatEdit24,
  IcFloatDelete24,
  IcTimetableFloatFinish,
} from '@confeti/design-system/icons';
import useDisableScroll from '@pages/time-table/hooks/use-disabled-scroll';
import { useDeleteTimeTableFestival } from '@pages/time-table/hooks/use-timetable-festival-mutation';
import { useScrollPosition } from '@pages/time-table/hooks/use-scroll-position';
import { EDIT_BOX, EDIT_BUTTON } from '../../constants/edit-floating-text';
import * as styles from './edit-floating-button.css';
import { queryClient } from '@shared/utils/query-client';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';
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
  handleFestivalClick: (festivalId: number) => void;
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
}: EditFloatingButtonProps) => {
  const deleteFestival = useDeleteTimeTableFestival();
  const isAtBottom = useScrollPosition();
  const adjustedAtBottom =
    isEditTimeTableMode || isFestivalDeleteMode ? false : isAtBottom;
  useDisableScroll(isEditMode && !isEditTimeTableMode && !isFestivalDeleteMode);

  const handleToggleButton = () => {
    if (isEditTimeTableMode || isFestivalDeleteMode) {
      festivalsToDelete.map((id) => deleteFestival.mutate(id));
      queryClient.invalidateQueries({
        queryKey: ['festivalButton', 'festivalTimetable'],
      });
      if (remainedFestival.length > 0) {
        handleFestivalClick(remainedFestival[0].festivalId);
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
