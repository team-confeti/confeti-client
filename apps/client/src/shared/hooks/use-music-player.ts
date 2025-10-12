import { useMemo, useRef, useState } from 'react';

import { musics } from '@shared/types/home-response';

export const useMusicPlayer = (data: musics[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentPlayingId(null);
    setIsAudioPlaying(false);
    setCurrentTime(0);
  };

  const onClickPlayToggle = (musicId: string) => {
    const selectedMusic = data.find((music) => music.musicId === musicId);
    if (!selectedMusic || !selectedMusic.previewUrl || !audioRef.current)
      return;

    const audio = audioRef.current;

    if (currentPlayingId === musicId && !audio.paused) {
      stopAudio();
      return;
    }

    audio.src = selectedMusic.previewUrl;
    audio.play().catch((e) => console.error('재생 오류', e));
    setCurrentPlayingId(musicId);
  };

  const audioEvents = useMemo(
    () => ({
      onLoadedMetadata: () => {
        const a = audioRef.current;
        if (!a) return;
        const d = Number.isFinite(a.duration) ? a.duration : 30;
        setDuration(d);
      },
      onTimeUpdate: () => {
        const a = audioRef.current;
        if (!a) return;
        setCurrentTime(a.currentTime);
      },
      onSeeked: () => {
        const a = audioRef.current;
        if (!a) return;
        setCurrentTime(a.currentTime);
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
