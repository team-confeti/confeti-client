import ArtistGrid from '@pages/performance/components/artist/artist-grid';
import MoreButton from '@pages/performance/components/button/more-button';

import { ConcertArtist } from '../../types/concert';

import * as styles from './expanded-section.css';

export const MAX_VISIBLE_ARTISTS = 4;

interface ExpandedSectionProps {
  isOpen: boolean;
  isExpanded: boolean;
  artists: ConcertArtist[];
  dayId: number;
  toggleExpand: (dayId: number) => void;
}

const ExpandedSection = ({
  isExpanded,
  artists,
  dayId,
  toggleExpand,
}: ExpandedSectionProps) => {
  return (
    <section className={styles.expandedSection}>
      <div
        className={`${styles.expandedArtists} ${isExpanded ? styles.expandedArtistsVisible : ''}`}
      >
        <ArtistGrid
          artists={artists.slice(MAX_VISIBLE_ARTISTS)}
          dayId={dayId}
          type="expanded"
        />
      </div>
      <MoreButton
        isExpanded={isExpanded}
        onToggle={() => toggleExpand(dayId)}
      />
    </section>
  );
};

export default ExpandedSection;
