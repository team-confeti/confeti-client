import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';
import NoticeSection from '@pages/search/components/notice-section';
import ArtistSection from '@pages/search/components/artist-section';
import PerformanceSection from '@pages/search/components/performance-section';
import PerformanceCount from '@pages/search/components/performance-count-section';
import { useSearchLogic } from '../hooks/use-search-logic';
import { useSearchPerformances } from '../hooks/use-search-data';
import ArtistNotFound from '../components/artist-not-found';
import * as styles from './search.css';

const Search = () => {
  const {
    artistData,
    paramsKeyword,
    searchKeyword,
    barFocus,
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
      <SearchBar
        value={searchKeyword}
        onChange={handleOnChange}
        onKeyDown={handleKeydown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      {!barFocus && paramsKeyword.length > 0 && (
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
