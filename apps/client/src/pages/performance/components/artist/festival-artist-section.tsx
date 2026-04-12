import { useId, useState } from 'react';

import { Avatar } from '@confeti/design-system';

import { logClickEvent } from '@shared/analytics/logging';
import Collapse from '@shared/components/collapse/collapse';
import { drop, isEmpty, take } from '@shared/lib/es-toolkit/es';
import { FestivalDate } from '@shared/types/festival-response';

import MoreButton from '../button/more-button';
import ArtistSectionTitle from './artist-section-title';

import * as styles from './festival-artist-section.css';

const MAX_ARTIST_LENGTH = 4;

const FestivalArtistDateSection = ({
  festivalDate,
}: {
  festivalDate: FestivalDate;
}) => {
  const [showExpandedArtists, setShowExpandedArtists] = useState(false);
  const artistRegionId = useId();
  const hiddenArtists = drop(festivalDate.artists, MAX_ARTIST_LENGTH);
  const showMoreButton = !isEmpty(hiddenArtists);

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
    <section className={styles.festivalContentItems}>
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
        {showMoreButton && (
          <Collapse
            id={artistRegionId}
            className={styles.artistCollapseRegion}
            role="region"
            aria-hidden={!showExpandedArtists}
            isExpanded={showExpandedArtists}
          >
            <div className={styles.artistCollapseRegionInner}>
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
            </div>
          </Collapse>
        )}
      </div>
      {showMoreButton && (
        <div className={styles.festivalMorebutton}>
          <MoreButton
            controlsId={artistRegionId}
            isExpanded={showExpandedArtists}
            onToggle={handleToggleExpandedArtists}
          />
        </div>
      )}
    </section>
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
