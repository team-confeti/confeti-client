import { useState } from 'react';

import { Avatar } from '@confeti/design-system';
import { cn } from '@confeti/utils';

import { logClickEvent } from '@shared/analytics/logging';
import { FestivalDate } from '@shared/types/festival-response';

import MoreButton from '../button/more-button';
import ArtistSectionTitle from './artist-section-title';

import * as styles from './festival-artist-section.css';

const MAX_ARTIST_LENGTH = 4;

interface FestivalArtistSectionProps {
  artists: FestivalDate[];
}

const FestivalArtistSection = ({ artists }: FestivalArtistSectionProps) => {
  const [expandedDates, setExpandedDates] = useState<Record<number, boolean>>(
    {},
  );

  const toggleExpanded = (id: number) => {
    logClickEvent({
      name: 'click_box_show_more',
      params: {
        source_page: 'festival_detail',
        entry_point: 'festival_artist',
      },
    });
    setExpandedDates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const processedArtists = artists.map((festivalDate) => {
    const isExpanded = Boolean(expandedDates[festivalDate.festivalDateId]);
    const isMorebuttonVisible = festivalDate.artists.length > MAX_ARTIST_LENGTH;
    return {
      ...festivalDate,
      isExpanded,
      isMorebuttonVisible,
    };
  });

  return (
    <>
      <div className={styles.festivalArtistTitle}>
        <ArtistSectionTitle />
      </div>
      <section className={styles.festivalContentContainer}>
        {processedArtists.map((festivalDate) => (
          <div
            key={festivalDate.festivalDateId}
            className={styles.festivalContentItems}
          >
            <p className={styles.festivalDayBadge}>{festivalDate.festivalAt}</p>
            <div
              className={cn(
                styles.artistGridVariants({
                  expanded: festivalDate.isExpanded,
                }),
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
            {festivalDate.isMorebuttonVisible && (
              <div className={styles.festivalMorebutton}>
                <MoreButton
                  isExpanded={festivalDate.isExpanded}
                  onToggle={() => toggleExpanded(festivalDate.festivalDateId)}
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
};

export default FestivalArtistSection;
