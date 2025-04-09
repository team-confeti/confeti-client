import MusicItem from '../music-item/music-item';

interface Music {
  id: string;
  albumImage: string;
  title: string;
  artist: string;
  isPlaying?: boolean;
}

interface MusicListProps {
  musics: Music[];
  variant?: 'default' | 'editable' | 'confirmDelete';
  onClickPlayToggle?: (id: string) => void;
  onClickDelete?: (id: string) => void;
  getDragHandleProps?: (id: string) => React.HTMLAttributes<HTMLElement>;
}

const MusicList = ({
  musics,
  variant = 'default',
  onClickPlayToggle,
  onClickDelete,
  getDragHandleProps,
}: MusicListProps) => {
  return (
    <div>
      {musics.map((music) => (
        <MusicItem
          key={music.id}
          albumImage={music.albumImage}
          title={music.title}
          artist={music.artist}
          isPlaying={music.isPlaying}
          variant={variant}
          onClickPlayToggle={() => onClickPlayToggle?.(music.id)}
          onClickDelete={() => onClickDelete?.(music.id)}
          dragHandleProps={getDragHandleProps?.(music.id)}
        />
      ))}
    </div>
  );
};

export default MusicList;
