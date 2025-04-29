import { useState } from 'react';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';

import { Button, SearchBar, toast } from '@confeti/design-system';

import * as styles from './add-songs-page.css';

const AddSongsPage = () => {
  const [keyword, setKeyword] = useState('');
  const [isConfirmAddSection, setIsConfirmAddSection] = useState(false);
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

  return (
    <>
      {isConfirmAddSection ? (
        <ConfirmAddSection />
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
            <div>{/* {renderSearchContent()} */}</div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              text="선택 완료"
              disabled={keyword.length === 0}
              onClick={handleMoveToConfirmAddSection}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddSongsPage;
