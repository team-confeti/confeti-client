import * as styles from './search.css';
import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import NoticeSection from '@pages/search/components/notice-section';
import ArtistSection from '@pages/search/components/artist-section';
import PerformanceSection from '@pages/search/components/performance-section';
import PerformanceCount from '@pages/search/components/performance-count-section';
import ArtistNotFound from '@pages/search/components/artist-not-found';
import { useSearchLogic } from '../hooks/use-search-logic';

const Search = () => {
  const {
    artistData,
    paramsKeyword,
    barFocus,
    handleOnChange,
    handleKeydown,
    handleOnFocus,
    handleOnBlur,
  } = useSearchLogic();

  return (
    <>
      <SearchBar
        onChange={handleOnChange}
        onKeyDown={handleKeydown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      {!barFocus && (
        <>
          <main className={styles.resultSection}>
            {paramsKeyword.length > 0 ? (
              <>
                <NoticeSection
                  isMultipleArtists={artistData[0]?.isMultipleArtists}
                />
                <ArtistSection artist={artistData} />
                <Spacing />
                <PerformanceCount />
                <PerformanceSection />
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
