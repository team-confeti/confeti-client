import { useState } from 'react';
import { ConcertArtist } from '../types/concert';
import { FestivalDate } from '../types/festival';
import MoreButton from './more-button';
import * as styles from './artist-list.css';

interface ArtistListProps {
  type: 'concert' | 'festival';
  artistData:
    | {
        isOpen: boolean;
        concertArtists: ConcertArtist[];
      }
    | {
        festivalDates: FestivalDate[];
      };
}

const MAX_VISIBLE_ARTISTS = 4;

const ArtistList = ({ type, artistData }: ArtistListProps) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleDay = (dayId: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  if (type === 'concert') {
    const concertData = artistData as {
      isOpen: boolean;
      concertArtists: ConcertArtist[];
    };
    const isExpanded = expandedDays[-1] || false;

    return (
      <div className={styles.artistSection}>
        <div className={styles.daySection}>
          <div className={styles.grid}>
            {concertData.concertArtists
              .slice(0, MAX_VISIBLE_ARTISTS)
              .map((artist, idx) => (
                <div
                  key={`visible-concert-${artist.artistId}-${idx}`}
                  className={styles.artist}
                >
                  <div className={styles.artistImage}>
                    <img src={artist.profileUrl} alt={artist.name} />
                  </div>
                  <p className={styles.artistName}>{artist.name}</p>
                </div>
              ))}
          </div>
        </div>
        {concertData.isOpen && (
          <div className={styles.expandedSection}>
            {isExpanded && (
              <div className={styles.expandedArtists}>
                <div className={styles.grid}>
                  {concertData.concertArtists
                    .slice(MAX_VISIBLE_ARTISTS)
                    .map((artist, idx) => (
                      <div
                        key={`expanded-concert-${artist.artistId}-${idx}`}
                        className={styles.artist}
                      >
                        <div className={styles.artistImage}>
                          <img src={artist.profileUrl} alt={artist.name} />
                        </div>
                        <p className={styles.artistName}>{artist.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <MoreButton
              isExpanded={isExpanded}
              onToggle={() => toggleDay(-1)}
            />
          </div>
        )}
      </div>
    );
  }

  const festivalData = artistData as { festivalDates: FestivalDate[] };
  return (
    <div className={styles.dayGroups}>
      {festivalData.festivalDates.map((day) => {
        const isExpanded = expandedDays[day.festivalDateId] || false;

        return (
          <div key={day.festivalDateId} className={styles.dayGroup}>
            <div className={styles.daySection}>
              <h3 className={styles.dayTitle}>{day.festivalAt}</h3>
              <div className={styles.grid}>
                {day.artists
                  .slice(0, MAX_VISIBLE_ARTISTS)
                  .map((artist, idx) => (
                    <div
                      key={`visible-${day.festivalDateId}-${artist.artistId}-${idx}`}
                      className={styles.artist}
                    >
                      <div className={styles.artistImage}>
                        <img src={artist.profileUrl} alt={artist.name} />
                      </div>
                      <p className={styles.artistName}>{artist.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            {day.isOpen && (
              <div className={styles.expandedSection}>
                {isExpanded && (
                  <div className={styles.expandedArtists}>
                    <div className={styles.grid}>
                      {day.artists
                        .slice(MAX_VISIBLE_ARTISTS)
                        .map((artist, idx) => (
                          <div
                            key={`expanded-${day.festivalDateId}-${artist.artistId}-${idx}`}
                            className={styles.artist}
                          >
                            <div className={styles.artistImage}>
                              <img src={artist.profileUrl} alt={artist.name} />
                            </div>
                            <p className={styles.artistName}>{artist.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <MoreButton
                  isExpanded={isExpanded}
                  onToggle={() => toggleDay(day.festivalDateId)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArtistList;
