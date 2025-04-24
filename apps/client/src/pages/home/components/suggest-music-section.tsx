import { Box, Button, MusicList } from '@confeti/design-system';
import { IcLoad, IcMusic } from '@confeti/design-system/icons';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { SuggestMusicResponse } from '@shared/types/home-response';

import * as styles from './suggest-music-section.css';

const SuggestMusicSection = ({
  data,
  ref: scrollRef,
}: {
  data: SuggestMusicResponse;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const { musicList, onClickPlayToggle, audioRef } = useMusicPlayer(
    data.musicList,
  );

  return (
    <Box
      title="미리 음악을 한 번 들어볼까요?"
      titleSize="lg"
      subtitle={data.title}
      subtitleIcon={<IcMusic width="1.4rem" height="1.4rem" />}
    >
      <div ref={scrollRef}>
        <MusicList musics={musicList} onClickPlayToggle={onClickPlayToggle} />
        <audio ref={audioRef} />
      </div>
      <Button
        text="다른 노래 더보기"
        icon={<IcLoad width="2.8rem" height="2.8rem" />}
        className={styles.button}
      />
    </Box>
  );
};

export default SuggestMusicSection;
