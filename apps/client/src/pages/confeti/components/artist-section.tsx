import { useState } from 'react';
import { ConcertArtist } from '../types/concert';
import { FestivalDate } from '../types/festival';
import MoreButton from './more-button';
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
}

const ArtistSection = ({ type, artistData }: ArtistListProps) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleExpand = (dayId: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  const renderExpandedSection = (
    isOpen: boolean,
    isExpanded: boolean,
    artists: ConcertArtist[],
    dayId: number,
  ) => {
    if (!isOpen) return null;

    return (
      <div className={styles.expandedSection}>
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
      </div>
    );
  };

  if (type === 'concert') {
    const { isOpen, concertArtists } = artistData as ConcertArtistData;
    const isExpanded = expandedDays[CONCERT_DEFAULT_ID] || false;

    return (
      <div className={styles.artistSection}>
        <div className={styles.daySection}>
          <ArtistGrid
            artists={concertArtists.slice(0, MAX_VISIBLE_ARTISTS)}
            dayId={CONCERT_DEFAULT_ID}
            type="visible"
          />
        </div>
        {renderExpandedSection(
          isOpen,
          isExpanded,
          concertArtists,
          CONCERT_DEFAULT_ID,
        )}
      </div>
    );
  }

  const { festivalDates } = artistData as FestivalArtistData;

  return (
    <div className={styles.dayGroups}>
      {festivalDates.map((day) => {
        const isExpanded = expandedDays[day.festivalDateId] || false;

        return (
          <div key={day.festivalDateId} className={styles.dayGroup}>
            <div className={styles.daySection}>
              <h3 className={styles.dayTitle}>{day.festivalAt}</h3>
              <ArtistGrid
                artists={day.artists.slice(0, MAX_VISIBLE_ARTISTS)}
                dayId={day.festivalDateId}
                type="visible"
              />
            </div>
            {renderExpandedSection(
              day.isOpen,
              isExpanded,
              day.artists,
              day.festivalDateId,
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArtistSection;
