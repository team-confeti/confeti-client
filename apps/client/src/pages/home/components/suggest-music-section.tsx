import { useState } from 'react';

import { Box, Button, MusicList } from '@confeti/design-system';
import { IcLoad, IcMusic } from '@confeti/design-system/icons';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { SuggestMusicPerformanceResponse } from '@shared/types/home-response';

import { useSuggestMusic } from '../hooks/use-home-queries';

import * as styles from './suggest-music-section.css';

const SuggestMusicSection = ({
  data,
  ref: scrollRef,
}: {
  data: SuggestMusicPerformanceResponse;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const [musicIdList, setMusicIdList] = useState<string[] | undefined>(
    undefined,
  );

  const {
    data: suggestMusic,
    refetch,
    isLoading,
  } = useSuggestMusic(data.performanceId, musicIdList);

  const { musicList, onClickPlayToggle, audioRef } = useMusicPlayer(
    suggestMusic?.musics ?? [],
  );

  const handleRefreshMusic = () => {
    const ids = musicList.map((music) => music.musicId);
    setMusicIdList(ids);
    refetch();
  };

  return (
    <Box
      title="미리 음악을 한 번 들어볼까요?"
      titleSize="lg"
      subtitle={data.title}
      subtitleIcon={<IcMusic width="1.4rem" height="1.4rem" />}
    >
      <div ref={scrollRef}>
        {isLoading ? (
          <div className={styles.loading} />
        ) : (
          <MusicList musics={musicList} onClickPlayToggle={onClickPlayToggle} />
        )}
        <audio ref={audioRef} />
      </div>
      <Button
        text="다른 노래 더보기"
        icon={<IcLoad width="2.8rem" height="2.8rem" />}
        className={styles.button}
        onClick={handleRefreshMusic}
      />
    </Box>
  );
};

export default SuggestMusicSection;
