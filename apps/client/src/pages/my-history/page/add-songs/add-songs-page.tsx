import { useEffect, useState } from 'react';
import {
  useArtistMusicSearch,
  useMusicSearch,
} from '@pages/my-history/hooks/use-music-search';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';

import { Button, SearchBar, toast } from '@confeti/design-system';
import MusicList from '@shared/components/music-list/music-list';
import { useRelatedSearch } from '@shared/hooks/queries/use-related-search-queries';
import { useMusicPlayer } from '@shared/hooks/use-music-player';

import * as styles from './add-songs-page.css';

interface MusicItemType {
  musicId: number;
  title: string;
  artistName: string;
  artworkUrl: string;
}

const AddSongsPage = () => {
  const [keyword, setKeyword] = useState('');
  const [isConfirmAddSection, setIsConfirmAddSection] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<MusicItemType[]>([]);
  const [artistId, setArtistId] = useState<string | null>(null);

  const {
    data: { relatedArtists },
  } = useRelatedSearch({
    keyword,
    enabled: !!keyword.trim(),
  });

  const { data: musicSearchData } = useMusicSearch(
    { term: keyword, offset: 0, limit: 5 },
    !!keyword,
  );

  const { data: artistMusicSearchData } = useArtistMusicSearch(
    { aid: artistId || '', term: keyword, offset: 0, limit: 5 },
    !!(artistId && keyword),
  );

  const combinedMusics = [
    ...(musicSearchData?.musics || []),
    ...(artistMusicSearchData?.musics || []),
  ];

  const { musicList, onClickPlayToggle, audioRef } = useMusicPlayer(
    combinedMusics.map((music) => ({
      ...music,
      musicId: String(music.musicId),
    })),
  );

  useEffect(() => {
    const matchingArtist = relatedArtists?.artists.find((artist) =>
      artist.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setArtistId(matchingArtist?.artistId || null);
  }, [relatedArtists, keyword]);

  const handleInputChangeWithReset = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setKeyword('');
  };

  const handleMoveToConfirmAddSection = () => setIsConfirmAddSection(true);

  const handleRemoveSong = (songId: number) => {
    setSelectedSongs((prev) => prev.filter((song) => song.musicId !== songId));
  };

  const handleConfirmAddSection = () => setIsConfirmAddSection(false);

  const handleClickMusic = (musicId: string) => {
    const song = musicList.find((m) => m.musicId === musicId);
    if (!song) return;

    const isAlreadySelected = selectedSongs.some(
      (s) => s.musicId === Number(song.musicId),
    );

    if (!isAlreadySelected) {
      const newSong = {
        musicId: Number(song.musicId),
        title: song.title,
        artistName: song.artistName,
        artworkUrl: song.artworkUrl,
      };

      setSelectedSongs((prev) => [...prev, newSong]);
      toast({
        text: '(이)가 대기열에 추가되었습니다.',
        highlightText: song.title,
        position: 'middleCenter',
      });
    }
  };

  return (
    <>
      {isConfirmAddSection ? (
        <ConfirmAddSection
          selectedSongs={selectedSongs}
          handleRemoveSong={handleRemoveSong}
          handleConfirmAddSection={handleConfirmAddSection}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.searchBarContainer}>
            <SearchBar
              placeholder="노래 제목 또는 아티스트를 검색해주세요."
              value={keyword}
              onChange={handleInputChangeWithReset}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.renderContentContainer}>
            <MusicList
              musics={musicList}
              onClickPlayToggle={onClickPlayToggle}
              onClickAdd={handleClickMusic}
              variant="default"
            />
            <audio ref={audioRef} />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              text="선택 완료"
              disabled={selectedSongs.length === 0}
              onClick={handleMoveToConfirmAddSection}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddSongsPage;
