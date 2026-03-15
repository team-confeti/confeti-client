import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';

import { logClickEvent, LogShowEvent } from '@shared/analytics/logging';
import { SETLIST_QUERY_OPTIONS } from '@shared/apis/setlist/setlist-queries';
import { SwitchCase } from '@shared/components';
import { useRelatedSearch } from '@shared/hooks/queries/use-related-search-queries';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { useKeyboard } from '@shared/hooks/use-keyboard';
import Loading from '@shared/pages/loading/loading';

import SetlistPerformance from '@pages/setlist/components/add-setlist/setlist-performance';

import * as styles from './add-setlist-page.css';

const AddSetlistPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsKeyword = searchParams.get('q') || '';

  const { keyword, debouncedKeyword, handleInputChange } =
    useDebouncedKeyword(paramsKeyword);

  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<
    'artist' | 'performance' | null
  >(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: { relatedArtists, relatedPerformances },
    isLoading: isRelatedSearchLoading,
  } = useRelatedSearch({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const { data: setListPerformance, isLoading: isSetListPerformanceLoading } =
    useQuery({
      ...SETLIST_QUERY_OPTIONS.SEARCH_PERFORMANCE(
        {
          aid: selectedType === 'artist' ? selectedId : null,
          pid: selectedType === 'performance' ? Number(selectedId) : null,
          term: selectedKeyword,
        },
        !!selectedKeyword,
      ),
    });

  const handleSelectItem = (
    keyword: string,
    type: 'artist' | 'performance',
    id: string,
  ) => {
    setSelectedKeyword(keyword);
    setSelectedType(type);
    setSelectedId(id);
    navigate(`/my/setlist/add-setlist?q=${keyword}`);
  };

  const handleSelectArtistSuggestion = (keyword: string, id: string) => {
    logClickEvent({
      name: 'click_setlist_search_artist_suggestion',
      params: {
        keyword,
        target_type: 'artist',
        target_id: id,
      },
    });
    handleSelectItem(keyword, 'artist', id);
  };

  const handleSelectPerformanceSuggestion = (keyword: string, id: number) => {
    logClickEvent({
      name: 'click_setlist_search_performance_suggestion',
      params: {
        keyword,
        target_type: 'performance',
        target_id: id,
      },
    });
    handleSelectItem(keyword, 'performance', String(id));
  };

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing && keyword.trim()) {
        (e.target as HTMLInputElement).blur();
      }
    },
  });

  const handleInputChangeWithReset = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleInputChange(e);
    setSelectedKeyword(null);
  };

  const SuggestionContent = () => (
    <>
      <SearchSuggestionList
        relatedKeyword={relatedArtists?.artists?.map((artist) => ({
          id: artist.artistId,
          title: artist.name,
          profileUrl: artist.profileUrl,
        }))}
        onSelectKeyword={handleSelectArtistSuggestion}
        listType="artist"
      />
      <SearchSuggestionList
        relatedKeyword={relatedPerformances?.performances?.map(
          (performance) => ({
            id: performance.id,
            title: performance.title,
            profileUrl: performance.posterUrl,
          }),
        )}
        onSelectKeyword={handleSelectPerformanceSuggestion}
        listType="performance"
      />
    </>
  );

  const ResultContent = () => (
    <SetlistPerformance
      performanceCount={setListPerformance?.performanceCount ?? 0}
      performances={setListPerformance?.performances ?? []}
    />
  );

  const hasSuggestions =
    (relatedArtists?.artists?.length ?? 0) > 0 ||
    (relatedPerformances?.performances?.length ?? 0) > 0;

  const searchState =
    isSetListPerformanceLoading || isRelatedSearchLoading
      ? 'loading'
      : selectedKeyword
        ? 'result'
        : hasSuggestions
          ? 'suggestion'
          : 'default';

  return (
    <div className={styles.container}>
      <LogShowEvent name="show_setlist_add" />
      <div className={styles.searchBarContainer}>
        <SearchBar
          placeholder="공연명 또는 아티스트를 검색해주세요."
          value={keyword}
          onChange={handleInputChangeWithReset}
          {...keyboardProps}
        />
      </div>

      <SwitchCase
        value={searchState}
        caseBy={{
          loading: () => <Loading />,
          result: () => <ResultContent />,
          suggestion: () => <SuggestionContent />,
        }}
        defaultComponent={() => null}
      />
    </div>
  );
};

export default AddSetlistPage;
