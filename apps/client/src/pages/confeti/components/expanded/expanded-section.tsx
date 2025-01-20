import { ConcertArtist } from '../../types/concert.ts';
import MoreButton from '@pages/confeti/components/button/more-button.tsx';
import ArtistGrid from '@pages/confeti/components/artist/artist-grid.tsx';
import * as styles from './expanded-section.css.ts';

export const MAX_VISIBLE_ARTISTS = 4;

interface ExpandedSectionProps {
  isOpen: boolean;
  isExpanded: boolean;
  artists: ConcertArtist[];
  dayId: number;
  toggleExpand: (dayId: number) => void;
}

const ExpandedSection = ({
  isOpen,
  isExpanded,
  artists,
  dayId,
  toggleExpand,
}: ExpandedSectionProps) => {
  if (!isOpen) return null;

  return (
    <section className={styles.expandedSection}>
      {isExpanded && (
        <div className={styles.expandedArtists}>
          <ArtistGrid
            artists={artists.slice(MAX_VISIBLE_ARTISTS)}
            dayId={dayId}
            type="expanded"
          />
        </div>
      )}
      <MoreButton
        isExpanded={isExpanded}
        onToggle={() => toggleExpand(dayId)}
      />
    </section>
  );
};

export default ExpandedSection;
