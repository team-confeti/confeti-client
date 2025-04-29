import { useState } from 'react';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';

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
            <div
              className={styles.musicListContainer}
              onClick={() => {
                handleAddSong({
                  musicId: 1,
                  title: 'test',
                  artistName: 'test',
                  artworkUrl: 'test',
                });
              }}
            >
              <MusicItem albumImage="" title="test" artist="test" />
            </div>

            {/* <div>{renderSearchContent()}</div> */}
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
