import { useQuery } from '@tanstack/react-query';

import { Box } from '@confeti/design-system';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { MusicList } from '@shared/components';
import MusicInfo from '@shared/components/music-list/music-info';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { SuggestMusicPerformanceResponse } from '@shared/types/home-response';

const SuggestMusicSection = ({
  data,
  ref: scrollRef,
}: {
  data: SuggestMusicPerformanceResponse;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const musicIdList: string[] | undefined = undefined;

  const { data: suggestMusic, isPending } = useQuery({
    ...HOME_QUERY_OPTIONS.SUGGEST_MUSIC(data.performanceId, musicIdList),
  });

  const { musicList, onClickPlayToggle, audioRef, audioEvents } =
    useMusicPlayer(suggestMusic?.musics ?? []);

  return (
    <Box
      title="공연 미리듣기"
      titleSize="lg"
      subtitle="예상 셋리스트, 미리 한번 들어볼까요?"
    >
      <div ref={scrollRef}>
        <MusicInfo title={data.title} />
        <MusicList
          appearance="home"
          musics={musicList}
          onClickPlayToggle={onClickPlayToggle}
          isPending={isPending}
          skeletonCount={3}
        />
        <audio
          ref={audioRef}
          onLoadedMetadata={audioEvents.onLoadedMetadata}
          onTimeUpdate={audioEvents.onTimeUpdate}
          onSeeked={audioEvents.onSeeked}
          onPlay={audioEvents.onPlay}
          onPause={audioEvents.onPause}
          onEnded={audioEvents.onEnded}
        />
      </div>
    </Box>
  );
};

export default SuggestMusicSection;
