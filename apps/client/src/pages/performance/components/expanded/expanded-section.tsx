import { useEffect, useRef, useState } from 'react';
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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (contentRef.current) {
        setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [isExpanded]);

  return (
    <section className={styles.expandedSection}>
      <div
        ref={contentRef}
        className={`${styles.expandedArtists} ${isExpanded ? styles.expandedArtistsVisible : ''}`}
        style={{
          height: isExpanded ? `${height}px` : '0',
        }}
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
