import { useEffect, useState } from 'react';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';
import {
  useArtistMusicSearch,
  useMusicSearch,
} from '@pages/my-history/page/hooks/use-music-search';

import { Button, MusicItem, SearchBar, toast } from '@confeti/design-system';
import { useRelatedSearch } from '@shared/hooks/use-related-search';

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
    keyword: keyword,
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

  useEffect(() => {
    if (relatedArtists?.artists) {
      // 검색어와 일치하거나 포함하는 첫 번째 아티스트의 ID를 사용
      const matchingArtist = relatedArtists.artists.find((artist) =>
        artist.name.toLowerCase().includes(keyword.toLowerCase()),
      );

      if (matchingArtist) {
        setArtistId(matchingArtist.artistId);
      } else {
        setArtistId(null);
      }
    } else {
      setArtistId(null);
    }
  }, [relatedArtists, keyword]);
  const handleInputChangeWithReset = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword('');
    }
  };

  const handleMoveToConfirmAddSection = () => {
    setIsConfirmAddSection(true);
  };

  const handleAddSong = (song: MusicItemType) => {
    // 이미 선택된 곡인지 확인
    const isAlreadySelected = selectedSongs.some(
      (selectedSong) => selectedSong.musicId === song.musicId,
    );

    if (!isAlreadySelected) {
      setSelectedSongs([...selectedSongs, song]);
      toast({
        text: '(이)가 대기열에 추가되었습니다.',
        highlightText: song.title,
        position: 'middleCenter',
      });
    } else {
      return;
    }
  };

  const handleRemoveSong = (songId: number) => {
    setSelectedSongs((prevSongs) =>
      prevSongs.filter((song) => Number(song.musicId) !== Number(songId)),
    );
  };

  const handleConfirmAddSection = () => {
    setIsConfirmAddSection(false);
  };

  return (
    <>
      {isConfirmAddSection ? (
        <ConfirmAddSection
          handleRemoveSong={handleRemoveSong}
          selectedSongs={selectedSongs}
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
            {musicSearchData &&
              musicSearchData.musics.map((song) => (
                <div
                  key={song.musicId}
                  className={styles.musicListContainer}
                  onClick={() => {
                    handleAddSong({
                      musicId: song.musicId,
                      title: song.title,
                      artistName: song.artistName,
                      artworkUrl: song.artworkUrl,
                    });
                  }}
                >
                  <MusicItem
                    albumImage={song.artworkUrl}
                    title={song.title}
                    artist={song.artistName}
                  />
                </div>
              ))}
            {artistMusicSearchData &&
              artistMusicSearchData.musics.map((song) => (
                <div
                  key={song.musicId}
                  className={styles.musicListContainer}
                  onClick={() => {
                    handleAddSong({
                      musicId: song.musicId,
                      title: song.title,
                      artistName: song.artistName,
                      artworkUrl: song.artworkUrl,
                    });
                  }}
                >
                  <MusicItem
                    albumImage={song.artworkUrl}
                    title={song.title}
                    artist={song.artistName}
                  />
                </div>
              ))}
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
