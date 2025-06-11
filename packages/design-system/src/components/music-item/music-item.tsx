import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Icon } from '../../icons';

import * as styles from './music-item.css';

interface MusicItemProps {
  musicId: string;
  variant?: 'default' | 'editable' | 'confirmDelete';
  albumImage: string;
  title: string;
  artist: string;
  isPlaying?: boolean;
  onClickPlayToggle?: () => void;
  onClickDelete?: () => void;
  onClickAdd?: () => void;
}

const MusicItem = ({
  musicId,
  variant = 'default',
  albumImage,
  title,
  artist,
  isPlaying = false,
  onClickPlayToggle,
  onClickDelete,
  onClickAdd,
}: MusicItemProps) => {
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
      className={styles.musicItemWrapper}
    >
      <div className={styles.contentWrapper} onClick={onClickAdd}>
        {renderAlbumCover()}
        <div className={styles.textSection}>
          <p className={styles.title}>{title}</p>
          <p className={styles.artist}>{artist}</p>
        </div>
      </div>
      <div className={styles.rightIcon}>{renderControlButton()}</div>
    </div>
  );
};

export default MusicItem;
