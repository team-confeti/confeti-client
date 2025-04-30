import { Footer, Spacing } from '@confeti/design-system';
import {
  ArtistSearch,
  PerformanceTypeAnalysis,
  RelatedPerformanceResponse,
} from '@shared/types/search-reponse';

import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/notice-section';
import PerformanceSection from '../components/search-result/performance/performance-section';
import { useIntendedPerformance } from '../hooks/use-search-data';

import * as styles from './search-result-page.css';

interface Props {
  artistData: ArtistSearch | null;
  relatedPerformances: RelatedPerformanceResponse | null;
  performanceTypeAnalysisData: PerformanceTypeAnalysis | null;
  refetchArtist?: () => void;
}

const SearchResult = ({
  artistData,
  relatedPerformances,
  performanceTypeAnalysisData,
  refetchArtist,
}: Props) => {
  const { data: intendedPerformanceData } = useIntendedPerformance({
    request: {
      pid: Number(relatedPerformances?.performances?.[0]?.id) || null,
      aid: artistData?.artistId || null,
      ptitle: performanceTypeAnalysisData?.processedTerm || null,
      ptype: performanceTypeAnalysisData?.performanceType || null,
    },
  });

  // console.log(artistData);

  return (
    <>
      <main className={styles.resultSection}>
        {artistData?.artistId ? (
          <>
            <NoticeSection isMultipleArtists={artistData.isMultipleArtists} />
            <ArtistSection artist={artistData} refetchArtist={refetchArtist} />
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
