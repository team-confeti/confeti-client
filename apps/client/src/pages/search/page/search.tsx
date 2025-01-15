import { useState } from 'react';
import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import ArtistInfo from '../components/artist-info';
import PerformanceInfo from '../components/performance-info';
import PerformanceCount from '../components/performance-count';
import Title from '../components/title';
import { searchedArtists } from '@shared/mocks/searched-artist-data';
import { searchedPerformances } from '@shared/mocks/searched-performance-data';
import * as styles from './search.css';
import ArtistNotFound from '../components/artist-not-found';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태 관리
  const [artistResults, setArtistResults] = useState<typeof searchedArtists>(
    [],
  ); // 아티스트 검색 결과
  const [performanceResults, setPerformanceResults] = useState<
    typeof searchedPerformances
  >([]); // 공연 검색 결과

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // 아티스트 필터링
    const filteredArtists = searchedArtists.filter((artist) =>
      artist.name.includes(query),
    );
    setArtistResults(filteredArtists);

    // 공연 데이터 필터링
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

  return (
    <div className={styles.container}>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // 입력 값 업데이트
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)} // Enter 키로 검색 실행
      />

      <main className={styles.resultSection}>
        {artistResults.length > 0 ? (
          <>
            {/* 아티스트 섹션 */}
            <div className={styles.section}>
              <Title text="아티스트" />
              {artistResults.map((artist) => (
                <ArtistInfo
                  key={artist.artistId}
                  image={artist.profileUrl}
                  name={artist.name}
                  releaseDate={artist.latestReleaseAt}
                />
              ))}
            </div>

            <Spacing />

            {/* 공연 개수 섹션 */}
            <div className={styles.countSection}>
              <PerformanceCount count={performanceResults.length} />
            </div>

            {/* 공연 섹션 */}
            <div className={styles.section}>
              <Title text="예정된 공연" />
              {performanceResults.length > 0 ? (
                performanceResults.map((performance) => (
                  <PerformanceInfo
                    key={performance.performanceId}
                    title={performance.title}
                    performanceAt={performance.performanceAt}
                    posterUrl={performance.posterUrl}
                    area={performance.area}
                    isFavorite={performance.isFavorite}
                  />
                ))
              ) : (
                <div className={styles.emptyPerformanceSection}>
                  아직 예정된 공연이 없어요!
                </div>
              )}
            </div>
          </>
        ) : (
          <ArtistNotFound />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Search;
