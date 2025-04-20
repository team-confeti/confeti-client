import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';

import { useArtistRelatedKeyword } from '../hooks/use-get-related-keyword';

import * as styles from './artist-search.css';

const ArtistSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const relatedKeywordsData = useArtistRelatedKeyword({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const debounceInput = useCallback(
    debounce((nextValue: string) => {
      setDebouncedKeyword(nextValue);
    }, 500),
    [],
  );

  const handleSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
    debounceInput(inputValue);
  };

  useEffect(() => {
    return () => {
      debounceInput.cancel();
    };
  }, [debounceInput]);

  const hasArtistResults = (relatedKeywordsData?.artists?.length ?? 0) > 0;

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar
            placeholder="아티스트 또는 공연을 검색해보세요!"
            value={keyword}
            onChange={handleSearchBarChange}
          />
        </div>
      </div>

      {hasArtistResults ? (
        <section className={styles.searchSuggestionListSection}>
          <SearchSuggestionList relatedKeyword={relatedKeywordsData?.artists} />
        </section>
      ) : (
        <section className={styles.artistSearchContainer}>
          <p className={styles.artistSearchDescription}>
            선호하는 아티스트를 검색해보세요
          </p>
        </section>
      )}
    </>
  );
};

export default ArtistSearch;
