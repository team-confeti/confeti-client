import { Spacing } from '@confeti/design-system';

import { Footer } from '@shared/components';
import { SearchAllResponse } from '@shared/types/search-response';

import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/notice-section';
import PerformanceSection from '../components/search-result/performance/performance-section';

import * as styles from './search-result-page.css';

interface Props {
  searchData: SearchAllResponse | null;
  refetchArtist?: () => void;
}

const SearchResult = ({ searchData, refetchArtist }: Props) => {
  const artistData = searchData?.artist ?? null;
  const performanceData = searchData?.performances ?? [];
  const performanceCount = searchData?.performanceCount ?? 0;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.resultSection}>
        {artistData && (
          <>
            <NoticeSection isMultipleArtists={artistData?.isMultipleArtists} />
            <ArtistSection artist={artistData} refetchArtist={refetchArtist} />
            <Spacing />
          </>
        )}
        <PerformanceSection
          performanceCount={performanceCount}
          performances={performanceData}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SearchResult;
