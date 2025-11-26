import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box } from '@confeti/design-system';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { MusicList } from '@shared/components';
import MusicInfo from '@shared/components/music-list/music-info';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { RecommendPerformances } from '@shared/types/home-response';

interface SuggestMusicSectionProps {
  onClickDetail: (type: string, typeId: number) => void;
}

const PERFORMANCE_SIZE = 3;
const SONG_SIZE = 3;

const SuggestMusicSection = ({ onClickDetail }: SuggestMusicSectionProps) => {
  const { data, isPending } = useQuery({
    ...HOME_QUERY_OPTIONS.RECOMMEND_PERFORMANCES(PERFORMANCE_SIZE, SONG_SIZE),
  });

  const performances: RecommendPerformances[] = data?.performances ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPerformance = performances[currentIndex];

  const musicData = useMemo(
    () =>
      currentPerformance?.songs.map((song) => ({
        musicId: song.songId,
        songName: song.songName,
        artistName: song.artistName,
        artworkUrl: song.artworkUrl,
        previewUrl: song.previewUrl,
      })) ?? [],
    [currentPerformance],
  );

  const { musicList, onClickPlayToggle, audioRef, audioEvents, stopAudio } =
    useMusicPlayer(musicData);

  if (!isPending && performances.length === 0) {
    return null;
  }

  const handleDotClick = (index: number) => {
    if (!performances.length) return;
    if (index === currentIndex) return;
    if (index < 0 || index >= performances.length) return;

    stopAudio();
    setCurrentIndex(index);
  };

  const handleClickDetail = () => {
    if (!currentPerformance) return;
    onClickDetail(currentPerformance.type, currentPerformance.typeId);
  };

  return (
    <Box
      title="공연 미리듣기"
      titleSize="lg"
      subtitle="예상 셋리스트, 미리 한번 들어볼까요?"
    >
      <div>
        <MusicInfo
          title={currentPerformance?.title ?? ''}
          posterUrl={currentPerformance?.posterUrl ?? ''}
          total={performances.length}
          current={currentIndex}
          onDotClick={handleDotClick}
          onClickDetail={handleClickDetail}
        />
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
