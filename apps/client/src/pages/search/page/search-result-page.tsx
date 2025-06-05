import { Footer, Spacing } from '@confeti/design-system';
import { ArtistSearch, Performance } from '@shared/types/search-reponse';

import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/notice-section';
import PerformanceSection from '../components/search-result/performance/performance-section';

import * as styles from './search-result-page.css';

interface Props {
  artistData: ArtistSearch | null;
  performanceData: Performance[] | null;
  performanceCount: number;
  refetchArtist?: () => void;
}

const SearchResult = ({
  artistData,
  performanceData,
  performanceCount,
  refetchArtist,
}: Props) => {
  return (
    <>
      <main className={styles.resultSection}>
        {artistData?.artistId ? (
          <>
            <NoticeSection isMultipleArtists={artistData.isMultipleArtists} />
            <ArtistSection artist={artistData} refetchArtist={refetchArtist} />
            <Spacing />
            <PerformanceSection
              performanceCount={performanceCount}
              performances={performanceData ?? []}
            />
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
