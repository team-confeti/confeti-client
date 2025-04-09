import { useState } from 'react';
import ExpandedSection from '@pages/performance/components/expanded/expanded-section';

import { ConcertArtist } from '../../types/concert';
import { FestivalDate } from '../../types/festival';
import ArtistGrid from './artist-grid';

import * as styles from './artist-section.css';

const CONCERT_DEFAULT_ID = -1;
const MAX_VISIBLE_ARTISTS = 4;

interface ConcertArtistData {
  isOpen: boolean;
  concertArtists: ConcertArtist[];
}

interface FestivalArtistData {
  festivalDates: FestivalDate[];
}

interface ArtistListProps {
  type: 'concert' | 'festival';
  artistData: ConcertArtistData | FestivalArtistData;
  isMoreButton?: boolean;
}

const ArtistSection = ({ type, artistData, isMoreButton }: ArtistListProps) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleExpand = (dayId: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  if (type === 'concert') {
    const { isOpen, concertArtists } = artistData as ConcertArtistData;
    const isExpanded = expandedDays[CONCERT_DEFAULT_ID] || false;

    const VISIBLE_CONCERT_ARTISTS = concertArtists.slice(
      0,
      MAX_VISIBLE_ARTISTS,
    );

    return (
      <section className={styles.artistSection}>
        <div className={styles.artistGroup}>
          <ArtistGrid
            artists={VISIBLE_CONCERT_ARTISTS}
            dayId={CONCERT_DEFAULT_ID}
            type="visible"
          />
        </div>
        {isMoreButton && (
          <ExpandedSection
            isOpen={isOpen}
            isExpanded={isExpanded}
            artists={concertArtists}
            dayId={CONCERT_DEFAULT_ID}
            toggleExpand={toggleExpand}
          />
        )}
      </section>
    );
  }

  const { festivalDates } = artistData as FestivalArtistData;

  return (
    <div className={styles.dayGroups}>
      {festivalDates.map((day) => {
        const isExpanded = expandedDays[day.festivalDateId] || false;

        const VISIBLE_FESTIVAL_ARTISTS = day.artists.slice(
          0,
          MAX_VISIBLE_ARTISTS,
        );

        return (
          <div key={day.festivalDateId} className={styles.dayGroup}>
            <div className={styles.daySection}>
              <h3 className={styles.dayTitle}>{day.festivalAt}</h3>
              <ArtistGrid
                artists={VISIBLE_FESTIVAL_ARTISTS}
                dayId={day.festivalDateId}
                type="visible"
              />
            </div>
            {day.artists.length > MAX_VISIBLE_ARTISTS && (
              <ExpandedSection
                isOpen={day.isOpen}
                isExpanded={isExpanded}
                artists={day.artists}
                dayId={day.festivalDateId}
                toggleExpand={toggleExpand}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArtistSection;
