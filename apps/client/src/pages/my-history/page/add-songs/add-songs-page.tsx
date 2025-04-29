
import { useState } from 'react';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';
import {
  useArtistMusicSearch,
  useMusicSearch,
} from '@pages/my-history/page/hooks/use-music-search';

import { Button, MusicItem, SearchBar, toast } from '@confeti/design-system';

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
  const { data: musicSearchData } = useMusicSearch(
    { term: keyword, offset: 0, limit: 5 },
    true,
  );

  const { data: artistMusicSearchData } = useArtistMusicSearch(
    { aid: 'test', term: keyword, offset: 0, limit: 5 },
    true,
  );
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
        highlightText: '곡이름',
        position: 'middleCenter',
      });
    } else {
      return;
    }
  };

  const handleRemoveSong = (songId: number) => {
    setSelectedSongs(selectedSongs.filter((song) => song.musicId !== songId));
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
