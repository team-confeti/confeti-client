import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { MusicList } from '@shared/components';
import MusicInfo from '@shared/components/music-list/music-info';
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
      title="공연 미리듣기"
      titleSize="lg"
      subtitle="예상 셋리스트, 미리 한번 들어볼까요?"
    >
      <div ref={scrollRef}>
        <MusicInfo />
        <MusicList
          appearance="home"
          musics={musicList}
          onClickPlayToggle={onClickPlayToggle}
          isPending={isPending}
          skeletonCount={3}
        />
        <audio ref={audioRef} />
      </div>
      <Button
        text="다른 노래 더보기"
        icon={<Icon name="load" size="2.8rem" />}
        className={styles.button}
        onClick={handleRefreshMusic}
      />
    </Box>
  );
};

export default SuggestMusicSection;
