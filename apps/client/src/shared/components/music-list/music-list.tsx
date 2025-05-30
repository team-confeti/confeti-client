import { MusicItem } from '@confeti/design-system';

import Deferred from '../deferred/deferred';
import SkeletonList from './skeleton-list';

import * as styles from './music-list.css';
interface Music {
  musicId: string;
  artworkUrl: string;
  title: string;
  artistName: string;
  isPlaying?: boolean;
}

interface MusicListProps {
  musics: Music[];
  variant?: 'default' | 'editable' | 'confirmDelete';
  onClickPlayToggle?: (musicId: string) => void;
  onClickDelete?: (musicId: string) => void;
  onClickAdd?: (musicId: string) => void;
  isPending?: boolean;
}

const MusicList = ({
  musics,
  variant = 'default',
  onClickPlayToggle,
  onClickDelete,
  onClickAdd,
  isPending,
}: MusicListProps) => {
  return (
    <div className={styles.loading}>
      {isPending
        ? [0, 1, 2].map((index) => (
            <Deferred key={index}>
              <SkeletonList />
            </Deferred>
          ))
        : musics.map((music) => (
            <MusicItem
              key={music.musicId}
              musicId={music.musicId}
              albumImage={music.artworkUrl}
              title={music.title}
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
