import { useEffect, useRef, useState } from 'react';

import { musics } from '@shared/types/home-response';

export const useMusicPlayer = (data: musics[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const audioStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setCurrentPlayingId(null);
  };

  const onClickPlayToggle = (musicId: string) => {
    const selectedMusic = data.find((music) => music.musicId === musicId);
    if (!selectedMusic || !selectedMusic.previewUrl || !audioRef.current)
      return;

    const audio = audioRef.current;

    if (currentPlayingId === musicId && !audio.paused) {
      audioStop();
      return;
    }

    audio.src = selectedMusic.previewUrl;
    audio.play().catch((e) => console.error('재생 오류', e));
    setCurrentPlayingId(musicId);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentPlayingId(null);
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const musicList = data.map((music) => ({
    ...music,
    isPlaying: music.musicId === currentPlayingId,
  }));

  return {
    musicList,
    audioRef,
    onClickPlayToggle,
    audioStop,
  };
};
