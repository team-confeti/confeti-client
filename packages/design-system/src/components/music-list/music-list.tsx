import MusicItem from '../music-item/music-item';

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
}

const MusicList = ({
  musics,
  variant = 'default',
  onClickPlayToggle,
  onClickDelete,
  // getDragHandleProps,
}: MusicListProps) => {
  return (
    <div>
      {musics.map((music) => (
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
        />
      ))}
    </div>
  );
};

export default MusicList;
