import { useMemo, useState } from 'react';

import { Box } from '@confeti/design-system';

import { MusicList } from '@shared/components';
import MusicInfo from '@shared/components/music-list/music-info';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { RecommendPerformances } from '@shared/types/home-response';

interface SuggestMusicSectionProps {
  performances: RecommendPerformances[];
  // onClickDetail: NavigateToDetail;
}

const SuggestMusicSection = ({
  performances,
  // onClickDetail,
}: SuggestMusicSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPerformance = performances[currentIndex];

  const musicData = useMemo(
    () =>
      currentPerformance?.songs.map((song) => ({
        musicId: song.songId,
        trackName: song.songId,
        artistName: song.artistName,
        artworkUrl: song.artworkUrl,
        previewUrl: song.previewUrl,
      })) ?? [],
    [currentPerformance],
  );

  const { musicList, onClickPlayToggle, audioRef, audioEvents, stopAudio } =
    useMusicPlayer(musicData);

  if (!currentPerformance || performances.length === 0) {
    return null;
  }

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;

    if (index < 0 || index >= performances.length) return;

    stopAudio();
    setCurrentIndex(index);
  };

  return (
    <Box
      title="공연 미리듣기"
      titleSize="lg"
      subtitle="예상 셋리스트, 미리 한번 들어볼까요?"
    >
      <div>
        <MusicInfo
          title={currentPerformance.title}
          posterUrl={currentPerformance.posterUrl}
          total={performances.length}
          current={currentIndex}
          onDotClick={handleDotClick}
          // onClickDetail={}
        />
        <MusicList
          appearance="home"
          musics={musicList}
          onClickPlayToggle={onClickPlayToggle}
          // isPending={isPending}
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
