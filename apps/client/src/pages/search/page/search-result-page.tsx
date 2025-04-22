import { Footer, Spacing } from '@confeti/design-system';
import Loading from '@shared/pages/loading/loading';
import { ArtistSearch, Performance } from '@shared/types/search-reponse';

import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/common/notice-section';
import PerformanceCount from '../components/search-result/performance/performance-count-section';
import PerformanceSection from '../components/search-result/performance/performance-section';

import * as styles from './search-result-page.css';

interface SearchResultProps {
  artistData: ArtistSearch | null;
  performanceCount: number;
  performances: Performance[];
  hasNextPage: boolean;
  observerRef: (node: HTMLDivElement | null) => void;
  isLoading: boolean;
}

const SearchResult = ({
  artistData,
  performanceCount,
  performances,
  hasNextPage,
  observerRef,
  isLoading,
}: SearchResultProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <main className={styles.resultSection}>
        {artistData ? (
          <>
            <NoticeSection isMultipleArtists={artistData.isMultipleArtists} />
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
  );
};

export default SearchResult;
