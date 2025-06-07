import { useEffect, useState } from 'react';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';
import { useQuery } from '@tanstack/react-query';

import { Button, SearchBar, toast } from '@confeti/design-system';
import { SETLIST_QUERY_OPTION } from '@shared/apis/my-history/setlist-queries';
import MusicList from '@shared/components/music-list/music-list';
import { useRelatedSearch } from '@shared/hooks/queries/use-related-search-queries';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { MusicInfoResponse } from '@shared/types/my-history-response';

import * as styles from './add-songs-page.css';

const AddSongsPage = () => {
  const [keyword, setKeyword] = useState('');
  const [isConfirmAddSection, setIsConfirmAddSection] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<MusicInfoResponse[]>([]);
  const [artistId, setArtistId] = useState<string | null>(null);

  const {
    data: { relatedArtists },
  } = useRelatedSearch({
    keyword,
    enabled: !!keyword.trim(),
  });
  const { data: musicSearchData } = useQuery({
    ...SETLIST_QUERY_OPTION.SEARCH_MUSIC(
      { term: keyword, offset: 0, limit: 5 },
      !!keyword,
    ),
  });
  const { data: artistSearchData } = useQuery({
    ...SETLIST_QUERY_OPTION.SEARCH_ARTIST_MUSIC(
      { aid: artistId || '', term: keyword, offset: 0, limit: 5 },
      !!keyword,
    ),
  });

  const combinedMusics = [
    ...(musicSearchData?.musics || []),
    ...(artistSearchData?.musics || []),
  ];

  const { musicList, onClickPlayToggle, audioRef } =
    useMusicPlayer(combinedMusics);

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

  const handleRemoveSong = (musicId: string) => {
    setSelectedSongs((prev) => prev.filter((song) => song.musicId !== musicId));
  };

  const handleConfirmAddSection = () => setIsConfirmAddSection(false);

  const handleClickMusic = (musicId: string) => {
    const song = musicList.find((m) => m.musicId === musicId);
    if (!song) return;

    const isAlreadySelected = selectedSongs.some(
      (s) => s.musicId === song.musicId,
    );

    if (!isAlreadySelected) {
      const newSong = {
        musicId: song.musicId,
        trackName: song.trackName,
        artistName: song.artistName,
        artworkUrl: song.artworkUrl,
        previewUrl: song.previewUrl,
      };

      setSelectedSongs((prev) => [...prev, newSong]);
      toast({
        text: '(이)가 대기열에 추가되었습니다.',
        highlightText: song.trackName,
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
