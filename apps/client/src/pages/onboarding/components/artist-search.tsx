import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';

import { useArtistRelatedKeyword } from '../hooks/use-onboard';

import * as styles from './artist-search.css';

const ArtistSearch = () => {
  const { keyword, debouncedKeyword, handleInputChange } =
    useDebouncedKeyword();

  const relatedKeywordsData = useArtistRelatedKeyword({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const hasArtistResults = (relatedKeywordsData?.artists?.length ?? 0) > 0;

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar
            placeholder="아티스트 또는 공연을 검색해보세요!"
            value={keyword}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {hasArtistResults ? (
        <SearchSuggestionList relatedKeyword={relatedKeywordsData?.artists} />
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
