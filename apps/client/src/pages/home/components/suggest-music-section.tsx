import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, Button } from '@confeti/design-system';
import { IcLoad, IcMusic } from '@confeti/design-system/icons';
import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import MusicList from '@shared/components/music-list/music-list';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { SuggestMusicPerformanceResponse } from '@shared/types/home-response';

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
    isPending,
  } = useQuery({
    ...HOME_QUERY_OPTIONS.SUGGEST_MUSIC(data.performanceId, musicIdList),
  });

  const { musicList, onClickPlayToggle, audioRef, stopAudio } = useMusicPlayer(
    suggestMusic?.musics ?? [],
  );

  const handleRefreshMusic = () => {
    stopAudio();
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
        <MusicList
          musics={musicList}
          onClickPlayToggle={onClickPlayToggle}
          isPending={isPending}
          skeletonCount={3}
        />
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
