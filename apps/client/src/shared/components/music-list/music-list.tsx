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
}

interface MusicListProps {
  musics: Music[];
  variant?: 'default' | 'editable' | 'confirmDelete';
  isPending?: boolean;
  skeletonCount?: number;
  onClickPlayToggle?: (musicId: string) => void;
  onClickDelete?: (musicId: string) => void;
  onClickAdd?: (musicId: string) => void;
}

const MusicList = ({
  musics,
  variant = 'default',
  isPending,
  skeletonCount,
  onClickPlayToggle,
  onClickDelete,
  onClickAdd,
}: MusicListProps) => {
  return (
    <div className={styles.loading}>
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
              variant={variant}
              onClickPlayToggle={() => onClickPlayToggle?.(music.musicId)}
              onClickDelete={() => onClickDelete?.(music.musicId)}
              onClickAdd={() => onClickAdd?.(music.musicId)}
            />
          ))}
    </div>
  );
};

export default MusicList;
