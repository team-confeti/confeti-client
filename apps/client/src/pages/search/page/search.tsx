import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import ArtistSection from '../components/artist-section';
import PerformanceSection from '../components/performance-section';
import PerformanceCount from '../components/performance-count-section';
import NoticeSection from '../components/notice-section';
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

  const isMultipleArtists = artistResults[0]?.isMultipleArtists ?? false;

  const sortedPerformances = [...performanceResults].sort((a, b) => {
    const parseDate = (dateString: string) => {
      const [startDate] = dateString.split(' - ');
      return new Date(startDate.replace(/\./g, '-').trim());
    };

    const dateA = parseDate(a.performanceAt);
    const dateB = parseDate(b.performanceAt);

    return dateA.getTime() - dateB.getTime();
  });

  const showContent = !isSearchBarFocused && searchQuery !== '' && hasSearched;

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
