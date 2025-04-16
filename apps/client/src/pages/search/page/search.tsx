import ArtistSection from '@pages/search/components/artist-section';
import NoticeSection from '@pages/search/components/notice-section';
import PerformanceCount from '@pages/search/components/performance-count-section';
import PerformanceSection from '@pages/search/components/performance-section';

import { Footer, SearchBar, Spacing } from '@confeti/design-system';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';

import ArtistNotFound from '../components/artist-not-found';
import PopularSearchSection from '../components/popular-search-section';
import RecentFestivalSection from '../components/recent-festivals-section';
import RecentSearchSection from '../components/recent-search-section';
import { useSearchPerformances } from '../hooks/use-search-data';
import { useSearchLogic } from '../hooks/use-search-logic';

import * as styles from './search.css';

const Search = () => {
  const {
    artistData,
    paramsKeyword,
    searchKeyword,
    handleOnChange,
    handleKeydown,
    handleOnFocus,
    handleOnBlur,
  } = useSearchLogic();

  const artistId = artistData[0]?.artistId || '';
  const { performances, performanceCount, fetchNextPage, hasNextPage } =
    useSearchPerformances({
      artistId,
      enabled: !!artistId,
    });

  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);
  const isLoading = !artistData || artistData.length === 0;

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar
            value={searchKeyword}
            onChange={handleOnChange}
            onKeyDown={handleKeydown}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder="아티스트 또는 공연을 검색해보세요!"
          />
        </div>
      </div>

      {!paramsKeyword && searchKeyword.length === 0 && (
        <main className={styles.resultSection}>
          <RecentSearchSection />
          <PopularSearchSection />
          <RecentFestivalSection />
        </main>
      )}

      {paramsKeyword && (
        <>
          <main className={styles.resultSection}>
            {isLoading ? (
              <div />
            ) : artistId ? (
              <>
                <NoticeSection
                  isMultipleArtists={artistData[0]?.isMultipleArtists}
                />
                <ArtistSection artist={artistData} />
                <Spacing />
                <PerformanceCount count={performanceCount} />
                <PerformanceSection performances={performances} />
                {hasNextPage && (
                  <div ref={observerRef} style={{ height: '2rem' }} />
                )}
              </>
            ) : (
              <ArtistNotFound />
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Search;
