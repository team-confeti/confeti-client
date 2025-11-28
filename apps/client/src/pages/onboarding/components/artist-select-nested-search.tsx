import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';

import {
  ONBOARD_MUTATION_OPTIONS,
  ONBOARD_QUERY_OPTIONS,
} from '@shared/apis/onboard/queries';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { queryClient } from '@shared/utils/query-client';

import { ONBOARD_LIMIT } from '../constants/limit';

import * as searchStyles from './artist-search.css';
import * as styles from './artist-select.css';

interface ArtistSelectNestedSearchProps {
  onBack: () => void;
}

const ArtistSelectNestedSearch = ({
  onBack,
}: ArtistSelectNestedSearchProps) => {
  const { keyword, debouncedKeyword, handleInputChange } =
    useDebouncedKeyword();
  const [_searchParams, setSearchParams] = useSearchParams();

  const { data: relatedKeywordsData } = useQuery({
    ...ONBOARD_QUERY_OPTIONS.ARTIST_RELATED_KEYWORDS(
      debouncedKeyword,
      ONBOARD_LIMIT.RELATED_KEYWORD,
    ),
    enabled: !!debouncedKeyword.trim(),
  });

  const { mutate: mutateSelectedArtist } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.SELECTED_ARTIST(),
  });

  const hasArtistResults = (relatedKeywordsData?.artists?.length ?? 0) > 0;

  const handleArtistSelect = (artistId: string) => {
    mutateSelectedArtist([artistId], {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ONBOARD_QUERY_KEY.SELECTED_ARTIST(),
        });
        setSearchParams({ artist: artistId });
      },
    });
  };

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
          onSelectArtistId={handleArtistSelect}
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
