import {
  BtnDelete,
  BtnDeleteBlack,
  IcHamburger,
  IcPause,
  IcPlay,
} from '../../icons/src/index';

import * as styles from './music-item.css';

interface MusicItemProps {
  variant?: 'default' | 'editable' | 'confirmDelete';
  albumImage: string;
  title: string;
  artist: string;
  isPlaying?: boolean;
  onClickPlayToggle?: () => void;
  onClickDelete?: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
}

const MusicItem = ({
  variant = 'default',
  albumImage,
  title,
  artist,
  isPlaying = false,
  onClickPlayToggle,
  onClickDelete,
  dragHandleProps,
}: MusicItemProps) => {
  const renderRightIcon = () => {
    if (variant === 'default') {
      return (
        <button onClick={onClickPlayToggle}>
          {isPlaying ? (
            <IcPause width={24} height={24} />
          ) : (
            <IcPlay width={24} height={24} />
          )}
        </button>
      );
    }
    if (variant === 'editable') {
      return (
        <button {...dragHandleProps}>
          <IcHamburger width={24} height={24} />
        </button>
      );
    }
    if (variant === 'confirmDelete') {
      return (
        <button onClick={onClickDelete}>
          <BtnDeleteBlack width={24} height={24} />
        </button>
      );
    }
    return null;
  };

  const renderAlbumCover = () => {
    return (
      <div className={styles.albumCoverWrapper}>
        <img src={albumImage} alt={title} className={styles.albumCover} />
        {variant === 'editable' && (
          <div className={styles.albumOverlay}>
            <button className={styles.minusBtn} onClick={onClickDelete}>
              <BtnDelete width={36} height={36} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.musicItemWrapper}>
      {renderAlbumCover()}
      <div className={styles.textSection}>
        <p className={styles.title}>{title}</p>
        <p className={styles.artist}>{artist}</p>
      </div>
      <div className={styles.rightIcon}>{renderRightIcon()}</div>
    </div>
  );
};

export default MusicItem;
