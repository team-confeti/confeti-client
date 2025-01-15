import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import ArtistSection from '../components/artist-section';
import PerformanceSection from '../components/performance-section';
import PerformanceCount from '../components/performance-count-section';
import ArtistNotFound from '../components/artist-not-found';
import { useSearch } from '../hooks/useSearch';
import * as styles from './search.css';

const Search = () => {
  const {
    searchQuery,
    setSearchQuery,
    artistResults,
    performanceResults,
    hasSearched,
    setHasSearched,
    isSearchBarFocused,
    setIsSearchBarFocused,
    handleSearch,
  } = useSearch();

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setHasSearched(false);
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
        onFocus={() => setIsSearchBarFocused(true)}
      />
      <main className={styles.resultSection}>
        {isSearchBarFocused ||
        searchQuery === '' ||
        !hasSearched ? null : artistResults.length > 0 ? (
          <>
            <ArtistSection artists={artistResults} />
            <Spacing />
            <PerformanceCount count={performanceResults.length} />
            <PerformanceSection performances={performanceResults} />
          </>
        ) : (
          <ArtistNotFound />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Search;
