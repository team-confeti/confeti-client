import { useState } from 'react';

import { Avatar } from '@confeti/design-system';
import { cn } from '@confeti/utils';

import { FestivalDate } from '@shared/types/festival-response';

import MoreButton from '../button/more-button';
import ArtistSectionTitle from './artist-section-title';

import * as styles from './festival-artist-section.css';

const MAX_ARTIST_LENGTH = 4;
interface FestivalArtistSectionProps {
  artists: FestivalDate[];
}

const FestivalArtistSection = ({ artists }: FestivalArtistSectionProps) => {
  const isMorebuttonVisible = artists.length < MAX_ARTIST_LENGTH;
  const [expandedDates, setExpandedDates] = useState<Record<number, boolean>>(
    {},
  );

  const toggleExpanded = (id: number) => {
    setExpandedDates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className={styles.festivalArtistTitle}>
        <ArtistSectionTitle />
      </div>
      <section className={styles.festivalContentContainer}>
        {artists.map((festivalDate) => {
          const isExpanded =
            expandedDates[festivalDate.festivalDateId] ?? false;
          return (
            <div
              key={festivalDate.festivalDateId}
              className={styles.festivalContentItems}
            >
              <p className={styles.festivalDayBadge}>
                {festivalDate.festivalAt}
              </p>
              <div
                className={cn(
                  styles.artistGridVariants({ expanded: isExpanded }),
                )}
              >
                {festivalDate.artists.map((artist) => (
                  <figure
                    key={artist.artistId}
                    className={styles.festivalArtistContainer}
                  >
                    <Avatar
                      size="lg"
                      src={artist.profileUrl}
                      isHandleClick={false}
                    />
                    <p className={styles.festivalArtistName}>{artist.name}</p>
                  </figure>
                ))}
              </div>
              {isMorebuttonVisible && (
                <div className={styles.festivalMorebutton}>
                  <MoreButton
                    isExpanded={isExpanded}
                    onToggle={() => toggleExpanded(festivalDate.festivalDateId)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default FestivalArtistSection;
