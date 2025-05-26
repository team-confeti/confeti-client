import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';

import { ONBOARD_LIMIT } from '../constants/limit';
import { useArtistRelatedKeyword } from '../hooks/use-onboard';

import * as styles from './artist-search.css';

interface ArtistSearchProps {
  onArtistSelect: (artistId: string) => void;
  handleSearchParams: () => void;
}

const ArtistSearch = ({
  onArtistSelect,
  handleSearchParams,
}: ArtistSearchProps) => {
  const { keyword, debouncedKeyword, handleInputChange } =
    useDebouncedKeyword();

  const relatedKeywordsData = useArtistRelatedKeyword({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
    limit: ONBOARD_LIMIT.RELATED_KEYWORD,
  });

  const hasArtistResults = (relatedKeywordsData?.artists?.length ?? 0) > 0;

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar
            placeholder="아티스트를 검색해보세요!"
            value={keyword}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {hasArtistResults ? (
        <SearchSuggestionList
          relatedKeyword={relatedKeywordsData?.artists?.map((artist) => ({
            id: artist.artistId,
            title: artist.name,
            profileUrl: artist.profileUrl,
          }))}
          onSelectArtistId={onArtistSelect}
          handleSearchParams={handleSearchParams}
        />
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
