import { useState } from 'react';
import { searchedArtists } from '@pages/search/mocks/searched-artist-data';
import { searchedPerformances } from '@pages/search/mocks/searched-performance-data';

/**
 * 검색 기능을 위한 커스텀 훅
 *
 * TODO:
 * - API 연동 시 해당 훅 내부의 로직이 변경되어야 함
 * - 현재 클라이언트 사이드 필터링은 임시 구현이며, API 연동 시 제거 필요
 */
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [artistResults, setArtistResults] = useState<typeof searchedArtists>(
    [],
  );
  const [performanceResults, setPerformanceResults] = useState<
    typeof searchedPerformances
  >([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  /**
   * 검색 실행 함수
   *
   * TODO: API 연동 시 아래 변경 필요
   * - 현재: 클라이언트 사이드에서 mock 데이터 필터링
   * - 변경 예정: API로 검색어 전송 후 결과 수신
   */
  const handleSearch = async (query: string) => {
    setHasSearched(true);
    setIsSearchBarFocused(false);
    setSearchQuery(query);

    // api 연동 시 아래 필터링 로직은 제거
    const filteredArtists = searchedArtists.filter((artist) =>
      artist.name.includes(query),
    );
    setArtistResults(filteredArtists);

    if (filteredArtists.length > 0) {
      const artistId = filteredArtists[0].artistId;
      const filteredPerformances = searchedPerformances.filter(
        (performance) => performance.artistId === artistId,
      );
      setPerformanceResults(filteredPerformances);
    } else {
      setPerformanceResults([]);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    artistResults,
    performanceResults,
    hasSearched,
    setHasSearched,
    isSearchBarFocused,
    setIsSearchBarFocused,
    handleSearch,
  };
};
