import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { cn } from '@confeti/utils';

import { Icon } from '../../icons';

import * as styles from './music-item.css';
import { CIRC } from './music-item.css';

interface Props {
  musicId: string;
  variant?: 'default' | 'editable' | 'confirmDelete';
  albumImage: string;
  title: string;
  artist: string;
  isPlaying?: boolean;
  progress?: number;
  onClickPlayToggle?: () => void;
  onClickDelete?: () => void;
  onClickAdd?: () => void;
  appearance?: 'default' | 'home';
}

const MusicItem = ({
  musicId,
  variant = 'default',
  albumImage,
  title,
  artist,
  isPlaying = false,
  progress = 0,
  onClickPlayToggle,
  onClickDelete,
  onClickAdd,
  appearance = 'default',
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: musicId,
    });

  const renderControlButton = () => {
    const handleInteractionStart = (e: React.TouchEvent | React.MouseEvent) => {
      const target = e.currentTarget as HTMLElement;

      if ('vibrate' in navigator) {
        navigator.vibrate([25]);
      }

      target.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.9)' },
          { transform: 'scale(1)' },
        ],
        {
          duration: 150,
          easing: 'ease-out',
        },
      );
    };

    switch (variant) {
      case 'default':
        return (
          <button onClick={onClickPlayToggle}>
            {isPlaying ? (
              <Icon name="pause" size="2.4rem" color="confeti_lime" />
            ) : (
              <Icon name="play" size="2.4rem" color="confeti_lime" />
            )}
          </button>
        );
      case 'editable':
        return (
          <button
            {...listeners}
            className={styles.dragHandle}
            onTouchStart={handleInteractionStart}
            onMouseDown={handleInteractionStart}
          >
            <Icon name="hamburger" size="2.4rem" color="gray600" />
          </button>
        );
      case 'confirmDelete':
        return (
          <button onClick={onClickDelete}>
            <Icon name="close" size="2.4rem" />
          </button>
        );
      default:
        return null;
    }
  };

  const renderAlbumCover = () => {
    return (
      <div className={styles.albumCoverWrapper}>
        <img src={albumImage} alt={title} className={styles.albumCover} />
        {variant === 'editable' && (
          <div className={styles.albumOverlay}>
            <button className={styles.minusBtn} onClick={onClickDelete}>
              <Icon name="remove" size="2.4rem" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      className={styles.musicItemWrapper({ appearance })}
    >
      <div className={styles.contentWrapper} onClick={onClickAdd}>
        {renderAlbumCover()}
        <div className={styles.textSection}>
          <p className={styles.title({ appearance })}>{title}</p>
          <p className={styles.artist({ appearance })}>{artist}</p>
        </div>
      </div>
      <div
        className={cn(
          styles.player,
          variant !== 'default' && styles.playerTransparent,
        )}
      >
        <svg className={styles.progressSvg} viewBox="0 0 44 44" aria-hidden>
          <circle
            className={styles.progressCircle}
            cx="22"
            cy="22"
            r="21"
            style={{ strokeDashoffset: CIRC * (1 - progress) }}
          />
        </svg>
        <div>{renderControlButton()}</div>
      </div>
    </div>
  );
};

export default MusicItem;
