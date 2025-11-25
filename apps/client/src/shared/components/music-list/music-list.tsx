import { MusicItem } from '@confeti/design-system';

import Deferred from '../deferred/deferred';
import SkeletonList from './skeleton-list';

import * as styles from './music-list.css';

interface Music {
  musicId: string;
  artworkUrl: string;
  trackName: string;
  artistName: string;
  isPlaying?: boolean;
  progress?: number;
}

interface MusicListProps {
  musics: Music[];
  variant?: 'default' | 'editable' | 'confirmDelete';
  isPending?: boolean;
  skeletonCount?: number;
  onClickPlayToggle?: (musicId: string) => void;
  onClickDelete?: (musicId: string) => void;
  onClickAdd?: (musicId: string) => void;
  appearance?: 'default' | 'home';
}

const MusicList = ({
  musics,
  variant = 'default',
  isPending,
  skeletonCount,
  onClickPlayToggle,
  onClickDelete,
  onClickAdd,
  appearance,
}: MusicListProps) => {
  return (
    <div className={styles.wrapper({ appearance })}>
      {isPending
        ? Array.from({ length: skeletonCount ?? 0 }).map((_, index) => (
            <Deferred key={index}>
              <SkeletonList />
            </Deferred>
          ))
        : musics.map((music) => (
            <MusicItem
              key={music.musicId}
              musicId={music.musicId}
              albumImage={music.artworkUrl}
              title={music.trackName}
              artist={music.artistName}
              isPlaying={music.isPlaying}
              progress={music.progress}
              variant={variant}
              onClickPlayToggle={() => onClickPlayToggle?.(music.musicId)}
              onClickDelete={() => onClickDelete?.(music.musicId)}
              onClickAdd={() => onClickAdd?.(music.musicId)}
              appearance={appearance}
            />
          ))}
    </div>
  );
};

export default MusicList;
