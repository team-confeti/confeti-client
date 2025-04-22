import { Footer, Spacing } from '@confeti/design-system';
import { ArtistSearch } from '@shared/types/search-reponse';

import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import ArtistSection from '../components/search-result/artist/artist-section';
import NoticeSection from '../components/search-result/notice-section';
import PerformanceSection from '../components/search-result/performance/performance-section';
import { useArtistRelatedData } from '../hooks/use-search-data';

import * as styles from './search-result-page.css';

interface Props {
  artistData: ArtistSearch | null;
}
const SearchResult = ({ artistData }: Props) => {
  const { performancesData } = useArtistRelatedData(artistData?.artistId ?? '');

  return (
    <>
      <main className={styles.resultSection}>
        {artistData ? (
          <>
            <NoticeSection isMultipleArtists={artistData.isMultipleArtists} />
            <ArtistSection artist={artistData} />
            <Spacing />
            <PerformanceSection
              performanceCount={performancesData?.performanceCount ?? 0}
              performances={performancesData?.performances ?? []}
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
