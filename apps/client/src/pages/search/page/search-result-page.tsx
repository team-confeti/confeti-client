import { Footer, Spacing } from '@confeti/design-system';
import {
  ArtistSearch,
  IntendedPerformanceResponse,
} from '@shared/types/search-reponse';

import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/notice-section';
import PerformanceSection from '../components/search-result/performance/performance-section';
import { useArtistRelatedData } from '../hooks/use-search-data';

import * as styles from './search-result-page.css';

interface Props {
  artistData: ArtistSearch | null;
  intendedPerformanceData: IntendedPerformanceResponse | null;
}
const SearchResult = ({ artistData, intendedPerformanceData }: Props) => {
  const { performancesData } = useArtistRelatedData(
    artistData?.artistId || null,
  );

  return (
    <>
      <main className={styles.resultSection}>
        {artistData?.artistId ? (
          <>
            <NoticeSection isMultipleArtists={artistData.isMultipleArtists} />
            <ArtistSection artist={artistData} />
            <Spacing />
            <PerformanceSection
              performanceCount={intendedPerformanceData?.performanceCount ?? 0}
              performances={intendedPerformanceData?.performances ?? []}
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
