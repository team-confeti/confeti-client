import { useState } from 'react';
import ArtistList from '@pages/my/components/artist/artist-list';
import { useMyArtist } from '@pages/my/hooks/use-my-favorites';

import { Header } from '@confeti/design-system';
import { IcSwitch } from '@confeti/design-system/icons';
import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';

import * as styles from './artist-more.css';

const ArtistMore = () => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);
  const { data } = useMyArtist(sortOption);

  const toggleSort = () => {
    setSortOption((prev) =>
      prev === SORT_OPTIONS.RECENT
        ? SORT_OPTIONS.ALPHABETICAL
        : SORT_OPTIONS.RECENT,
    );
  };

  return (
    <>
      <Header variant="detail" title="My Artist" />
      <div className={styles.header}>
        <p>전체 {data.artistCount}</p>
        <button className={styles.sort} onClick={toggleSort}>
          <p>{SORT_LABELS[sortOption]}</p>
          <IcSwitch width={'1.6rem'} height={'1.6rem'} />
        </button>
      </div>

      <ArtistList artists={data.artists} />
    </>
  );
};

export default ArtistMore;
