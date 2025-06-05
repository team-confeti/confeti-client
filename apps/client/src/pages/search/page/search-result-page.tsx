import { useSuspenseQuery } from '@tanstack/react-query';

import { Footer, Spacing } from '@confeti/design-system';
import { SEARCH_PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/search/search-performance-queries';
import {
  ArtistSearch,
  PerformanceTypeAnalysis,
  RelatedPerformanceResponse,
} from '@shared/types/search-reponse';

import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/notice-section';
import PerformanceSection from '../components/search-result/performance/performance-section';

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
  const { data: intendedPerformanceData } = useSuspenseQuery({
    ...SEARCH_PERFORMANCE_QUERY_OPTIONS.SEARCH_INTENDED_PERFORMANCE({
      pid: Number(relatedPerformances?.performances?.[0]?.id) || null,
      aid: artistData?.artistId || null,
      ptitle: performanceTypeAnalysisData?.processedTerm || null,
      ptype: performanceTypeAnalysisData?.performanceType || null,
    }),
  });

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
