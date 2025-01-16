import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import ArtistSection from '../components/artist-section';
import PerformanceSection from '../components/performance-section';
import PerformanceCount from '../components/performance-count-section';
import NoticeSection from '../components/notice-section';
import ArtistNotFound from '../components/artist-not-found';
import { useSearch } from '../hooks/use-search';
import { useSortedPerformances } from '../hooks/use-sorted-performances';
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

  const isMultipleArtists = artistResults[0]?.isMultipleArtists ?? false;

  const sortedPerformances = useSortedPerformances(performanceResults);

  const showContent = !isSearchBarFocused && searchQuery !== '' && hasSearched;

  const handleSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHasSearched(false);
  };

  const handleSearchBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleSearchBarFocus = () => {
    setIsSearchBarFocused(true);
  };

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={handleSearchBarChange}
        onKeyDown={handleSearchBarKeyDown}
        onFocus={handleSearchBarFocus}
      />
      <main className={styles.resultSection}>
        {showContent ? (
          artistResults.length > 0 ? (
            <>
              <NoticeSection isMultipleArtists={isMultipleArtists} />
              <ArtistSection artists={artistResults} />
              <Spacing />
              <PerformanceCount count={sortedPerformances.length} />
              <PerformanceSection performances={sortedPerformances} />
            </>
          ) : (
            <ArtistNotFound />
          )
        ) : null}
      </main>
      {showContent && <Footer />}
    </>
  );
};

export default Search;
