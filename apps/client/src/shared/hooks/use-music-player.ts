import { useMemo, useRef, useState } from 'react';

import { musics } from '@shared/types/home-response';

export const useMusicPlayer = (data: musics[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);

  const stopAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setCurrentPlayingId(null);
    setIsAudioPlaying(false);
    setCurrentTime(0);
  };

  const onClickPlayToggle = (musicId: string) => {
    const selectedMusic = data.find((music) => music.musicId === musicId);
    if (!selectedMusic || !selectedMusic.previewUrl || !audioRef.current)
      return;

    if (currentPlayingId === musicId && !audioRef.current.paused) {
      stopAudio();
      return;
    }

    audioRef.current.src = selectedMusic.previewUrl;
    audioRef.current.play().catch((e) => console.error('재생 오류', e));
    setCurrentPlayingId(musicId);
  };

  const audioEvents = useMemo(
    () => ({
      onLoadedMetadata: () => {
        if (!audioRef.current) return;

        const d = Number.isFinite(audioRef.current.duration)
          ? audioRef.current.duration
          : 30;
        setDuration(d);
      },
      onTimeUpdate: () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
      },
      onSeeked: () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
      },
      onPlay: () => {
        setIsAudioPlaying(true);
      },
      onPause: () => {
        stopAudio();
      },
      onEnded: () => {
        stopAudio();
      },
    }),
    [currentPlayingId],
  );

  const progress = duration > 0 ? currentTime / duration : 0;

  const musicList = data.map((music) => ({
    ...music,
    isPlaying: music.musicId === currentPlayingId && isAudioPlaying,
    progress: music.musicId === currentPlayingId ? progress : 0,
  }));

  return {
    musicList,
    audioRef,
    audioEvents,
    onClickPlayToggle,
    stopAudio,
  };
};
