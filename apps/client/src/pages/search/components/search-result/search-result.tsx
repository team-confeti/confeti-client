import ArtistSection from '@pages/search/components/artist-section';
import NoticeSection from '@pages/search/components/notice-section';
import PerformanceCount from '@pages/search/components/performance-count-section';
import PerformanceSection from '@pages/search/components/performance-section';

import { Footer, Spacing } from '@confeti/design-system';
import { ArtistSearch, Performance } from '@shared/types/search-reponse';

import ArtistNotFound from '../artist-not-found';

import * as styles from './search-result.css';

interface SearchResultProps {
  isLoading: boolean;
  artistData: ArtistSearch[];
  artistId: string;
  performanceCount: number;
  performances: Performance[];
  hasNextPage: boolean;
  observerRef: (node: HTMLDivElement | null) => void;
}

const SearchResult = ({
  isLoading,
  artistData,
  artistId,
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
  );
};

export default SearchResult;
