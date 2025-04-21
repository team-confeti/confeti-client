import { Footer, Spacing } from '@confeti/design-system';
import { ArtistSearch, Performance } from '@shared/types/search-reponse';

import ArtistNotFound from './artist/artist-not-found';
import ArtistSection from './artist/artist-section';
import NoticeSection from './common/notice-section';
import PerformanceCount from './performance/performance-count-section';
import PerformanceSection from './performance/performance-section';

import * as styles from './search-result.css';

interface SearchResultProps {
  isLoading: boolean;
  artistData: ArtistSearch[];
  performanceCount: number;
  performances: Performance[];
  hasNextPage: boolean;
  observerRef: (node: HTMLDivElement | null) => void;
}

const SearchResult = ({
  isLoading,
  artistData,
  performanceCount,
  performances,
  hasNextPage,
  observerRef,
}: SearchResultProps) => {
  console.log(artistData);

  return (
    <>
      <main className={styles.resultSection}>
        {isLoading ? (
          <div />
        ) : artistData.length > 0 ? (
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
  );
};

export default SearchResult;
