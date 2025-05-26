import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SetlistPerformance from '@pages/my-history/components/add-setlist/setlist-performance';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { useRelatedSearch } from '@shared/hooks/use-related-search';
import Loading from '@shared/pages/loading/loading';

import { useSearchSetListPerformance } from '../../hooks/use-performance-search';

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
    useSearchSetListPerformance(
      {
        aid: selectedType === 'artist' ? selectedId : null,
        pid: selectedType === 'performance' ? Number(selectedId) : null,
        term: selectedKeyword,
      },
      !!selectedKeyword,
    );

  useEffect(() => {
    setSelectedKeyword(paramsKeyword);
  }, [paramsKeyword]);

  const handleSelectItem = (
    keyword: string,
    type: 'artist' | 'performance',
    id: string,
  ) => {
    setSelectedKeyword(keyword);
    setSelectedType(type);
    setSelectedId(id);
    navigate(`/my-history/setlist/add-setlist?q=${keyword}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && keyword.trim()) {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleInputChangeWithReset = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleInputChange(e);
    setSelectedKeyword(null);
  };

  const hasSearchResults =
    (relatedArtists?.artists?.length ?? 0) > 0 ||
    (relatedPerformances?.performances?.length ?? 0) > 0;

  const renderSearchContent = () => {
    const isLoadingState =
      isSetListPerformanceLoading || isRelatedSearchLoading;
    const isResultState = !!selectedKeyword;
    const isSuggestionState = !selectedKeyword && hasSearchResults;

    switch (true) {
      case isLoadingState:
        return <Loading />;

      case isResultState:
        return (
          <SetlistPerformance
            performanceCount={setListPerformance?.performanceCount ?? 0}
            performances={setListPerformance?.performances ?? []}
          />
        );

      case isSuggestionState:
        return (
          <>
            <SearchSuggestionList
              relatedKeyword={relatedArtists?.artists?.map((artist) => ({
                id: artist.artistId,
                title: artist.name,
                profileUrl: artist.profileUrl,
              }))}
              onSelectKeyword={(keyword, id) =>
                handleSelectItem(keyword, 'artist', id.toString())
              }
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
              onSelectKeyword={(keyword, id) =>
                handleSelectItem(keyword, 'performance', id.toString())
              }
              listType="performance"
            />
          </>
        );

      // TODO: default 처리
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <SearchBar
          placeholder="공연명 또는 아티스트를 검색해주세요."
          value={keyword}
          onChange={handleInputChangeWithReset}
          onKeyDown={handleKeyDown}
        />
      </div>

      {renderSearchContent()}
    </div>
  );
};

export default AddSetlistPage;
