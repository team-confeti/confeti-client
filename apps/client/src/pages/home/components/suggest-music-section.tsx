import { Box, MusicList } from '@confeti/design-system';
import { IcMusic } from '@confeti/design-system/icons';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { MusicList as MusicListType } from '@shared/types/home-response';

const SuggestMusicSection = ({
  data,
  title,
  ref: scrollRef,
}: {
  data: MusicListType[];
  title: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const { musicList, onClickPlayToggle, audioRef } = useMusicPlayer(data);

  return (
    <Box
      title="미리 음악을 한 번 들어볼까요?"
      titleSize="lg"
      subtitle={title}
      subtitleIcon={<IcMusic width="1.4rem" height="1.4rem" />}
    >
      <div ref={scrollRef}>
        <MusicList musics={musicList} onClickPlayToggle={onClickPlayToggle} />
        <audio ref={audioRef} />
      </div>
    </Box>
  );
};

export default SuggestMusicSection;
