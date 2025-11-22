import { useQuery } from '@tanstack/react-query';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';

import { ONBOARD_QUERY_OPTIONS } from '@shared/apis/onboard/queries';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';

import { ONBOARD_LIMIT } from '../constants/limit';

import * as searchStyles from './artist-search.css';
import * as styles from './artist-select.css';

interface ArtistSelectNestedSearchProps {
  onBack: () => void;
  onArtistSelect: (artistId: string) => void;
}

const ArtistSelectNestedSearch = ({
  onBack,
  onArtistSelect,
}: ArtistSelectNestedSearchProps) => {
  const { keyword, debouncedKeyword, handleInputChange } =
    useDebouncedKeyword();

  const { data: relatedKeywordsData } = useQuery({
    ...ONBOARD_QUERY_OPTIONS.ARTIST_RELATED_KEYWORDS(
      debouncedKeyword,
      ONBOARD_LIMIT.RELATED_KEYWORD,
    ),
    enabled: !!debouncedKeyword.trim(),
  });

  const hasArtistResults = (relatedKeywordsData?.artists?.length ?? 0) > 0;

  return (
    <section className={styles.onboardingContentSection}>
      <div className={searchStyles.searchBarContainer}>
        <div className={searchStyles.searchBarFrame}>
          <SearchBar
            placeholder="아티스트를 검색해보세요!"
            value={keyword}
            onChange={handleInputChange}
            autoFocus={true}
            onBack={onBack}
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
        />
      ) : (
        <section className={searchStyles.artistSearchContainer}>
          <p className={searchStyles.artistSearchDescription}>
            선호하는 아티스트를 검색해보세요
          </p>
        </section>
      )}
    </section>
  );
};

export default ArtistSelectNestedSearch;
