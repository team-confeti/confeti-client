import MusicItem from '../music-item/music-item';

interface Music {
  musicId: number;
  artWorkUrl: string;
  title: string;
  artistName: string;
  isPlaying?: boolean;
}

interface MusicListProps {
  musics: Music[];
  variant?: 'default' | 'editable' | 'confirmDelete';
  onClickPlayToggle?: (musicId: number) => void;
  onClickDelete?: (musicId: number) => void;
  getDragHandleProps?: (musicId: number) => React.HTMLAttributes<HTMLElement>;
}

const MusicList = ({
  musics,
  variant = 'default',
  onClickPlayToggle,
  onClickDelete,
  getDragHandleProps,
}: MusicListProps) => {
  console.log(musics);
  return (
    <div>
      {musics.map((music) => (
        <MusicItem
          key={music.musicId}
          albumImage={music.artWorkUrl}
          title={music.title}
          artist={music.artistName}
          isPlaying={music.isPlaying}
          variant={variant}
          onClickPlayToggle={() => onClickPlayToggle?.(music.musicId)}
          onClickDelete={() => onClickDelete?.(music.musicId)}
          dragHandleProps={getDragHandleProps?.(music.musicId)}
        />
      ))}
    </div>
  );
};

export default MusicList;
