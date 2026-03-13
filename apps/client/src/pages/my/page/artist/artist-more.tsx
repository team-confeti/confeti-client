import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent, LogShowEvent } from '@shared/analytics/logging';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { DetailHeader } from '@shared/components';
import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';

import ArtistList from '@pages/my/components/artist/artist-list';

import * as styles from './artist-more.css';

const ArtistMore = () => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);
  const { data } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_ARTISTS(sortOption),
  });

  const toggleSort = () => {
    setSortOption((prev) =>
      prev === SORT_OPTIONS.RECENT
        ? SORT_OPTIONS.ALPHABETICAL
        : SORT_OPTIONS.RECENT,
    );
  };

  return (
    <>
      <LogShowEvent name="show_my_artist" />
      <DetailHeader title="My Artist" />
      <div className={styles.header}>
        <p>전체 {data.artistCount}</p>
        <LogClickEvent
          name="click_my_artist_sort"
          params={{
            sort:
              sortOption === SORT_OPTIONS.RECENT
                ? SORT_OPTIONS.ALPHABETICAL
                : SORT_OPTIONS.RECENT,
          }}
        >
          <button className={styles.sort} onClick={toggleSort}>
            <p>{SORT_LABELS[sortOption]}</p>
            <Icon name="switch" size="1.6rem" />
          </button>
        </LogClickEvent>
      </div>

      <ArtistList artists={data.artists} />
    </>
  );
};

export default ArtistMore;
