import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Avatar } from '@confeti/design-system';

import { logClickEvent } from '@shared/analytics/logging';
import { drop, isEmpty, take } from '@shared/lib/es-toolkit/es';
import { FestivalDate } from '@shared/types/festival-response';

import MoreButton from '../button/more-button';
import ArtistSectionTitle from './artist-section-title';

import * as styles from './festival-artist-section.css';

const MAX_ARTIST_LENGTH = 4;
const ARTIST_EXPAND_TRANSITION = {
  duration: 0.35,
  ease: 'easeOut',
} as const;

const FestivalArtistDateSection = ({
  festivalDate,
}: {
  festivalDate: FestivalDate;
}) => {
  const [showExpandedArtists, setShowExpandedArtists] = useState(false);
  const hiddenArtists = drop(festivalDate.artists, MAX_ARTIST_LENGTH);

  const handleToggleExpandedArtists = () => {
    logClickEvent({
      name: 'click_box_show_more',
      params: {
        section: 'festival_artist',
      },
    });
    setShowExpandedArtists((prev) => !prev);
  };

  return (
    <div className={styles.festivalContentItems}>
      <p className={styles.festivalDayBadge}>{festivalDate.festivalAt}</p>
      <div className={styles.artistList}>
        <div className={styles.artistGrid}>
          {take(festivalDate.artists, MAX_ARTIST_LENGTH).map((artist) => (
            <figure
              key={artist.artistId}
              className={styles.festivalArtistContainer}
            >
              <Avatar size="lg" src={artist.profileUrl} isHandleClick={false} />
              <p className={styles.festivalArtistName}>{artist.name}</p>
            </figure>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {showExpandedArtists && (
            <motion.div
              className={styles.expandedArtistGrid}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: ARTIST_EXPAND_TRANSITION,
                opacity: { duration: 0.2, ease: 'easeOut' },
              }}
            >
              <div className={styles.artistGrid}>
                {hiddenArtists.map((artist) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!isEmpty(hiddenArtists) && (
        <div className={styles.festivalMorebutton}>
          <MoreButton
            showExpanded={showExpandedArtists}
            onToggle={handleToggleExpandedArtists}
          />
        </div>
      )}
    </div>
  );
};

interface FestivalArtistSectionProps {
  artists: FestivalDate[];
}

const FestivalArtistSection = ({ artists }: FestivalArtistSectionProps) => (
  <>
    <div className={styles.festivalArtistTitle}>
      <ArtistSectionTitle />
    </div>
    <section className={styles.festivalContentContainer}>
      {artists.map((festivalDate) => (
        <FestivalArtistDateSection
          key={festivalDate.festivalDateId}
          festivalDate={festivalDate}
        />
      ))}
    </section>
  </>
);

export default FestivalArtistSection;
