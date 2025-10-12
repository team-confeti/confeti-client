import { useEffect, useRef, useState } from 'react';

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
    // audio.currentTime = 0;
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      const d = Number.isFinite(audio.duration) ? audio.duration : 30;
      setDuration(d);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onSeeked = () => {
      setCurrentTime(audio.currentTime);
    };

    const onPlay = () => {
      setIsAudioPlaying(true);
    };

    const onPause = () => {
      setIsAudioPlaying(false);
      // setCurrentPlayingId(null);
    };

    const onEnded = () => {
      setCurrentPlayingId(null);
      setIsAudioPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('seeked', onSeeked);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('seeked', onSeeked);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const progress = duration > 0 ? currentTime / duration : 0;

  const musicList = data.map((music) => ({
    ...music,
    isPlaying: music.musicId === currentPlayingId && isAudioPlaying,
    progress: music.musicId === currentPlayingId ? progress : 0,
  }));

  return {
    musicList,
    audioRef,
    onClickPlayToggle,
    stopAudio,
  };
};
