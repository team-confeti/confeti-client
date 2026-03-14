import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box } from '@confeti/design-system';

import { logClickEvent } from '@shared/analytics/logging';
import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { MusicList } from '@shared/components';
import MusicInfo from '@shared/components/music-list/music-info';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { RecommendPerformances } from '@shared/types/home-response';

import { PERFORMANCE_SIZE, SONG_SIZE } from '../constants/recommend';

interface SuggestMusicSectionProps {
  onClickDetail: (type: string, typeId: number) => void;
}

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
        trackName: song.songName,
        artistName: song.artistName,
        artworkUrl: song.artworkUrl,
        previewUrl: song.previewUrl,
      })) ?? [],
    [currentPerformance],
  );

  const { musicList, onClickPlayToggle, audioRef, audioEvents, stopAudio } =
    useMusicPlayer(musicData);

  const handleDotClick = (index: number) => {
    if (!performances.length) return;
    if (index === currentIndex) return;
    if (index < 0 || index >= performances.length) return;

    stopAudio();
    setCurrentIndex(index);
  };

  const handleClickPerformanceDetail = (type: string, typeId: number) => {
    onClickDetail(type, typeId);
  };

  const handleClickPlayToggle = (musicId: string) => {
    logClickEvent({
      name: 'click_music_play_toggle',
      params: {
        source_page: 'home',
        target_id: musicId,
        entry_point: 'recommend_music',
      },
    });
    onClickPlayToggle(musicId);
  };

  return (
    <Box
      title="공연 미리듣기"
      titleSize="lg"
      subtitle="예상 셋리스트, 미리 한번 들어볼까요?"
    >
      <div>
        <MusicInfo
          performances={performances}
          total={performances.length}
          current={currentIndex}
          onChangeIndex={handleDotClick}
          onClickDetail={handleClickPerformanceDetail}
          isPending={isPending}
        />
        <MusicList
          appearance="home"
          musics={musicList}
          onClickPlayToggle={handleClickPlayToggle}
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
