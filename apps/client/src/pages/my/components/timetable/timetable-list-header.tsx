import { useState } from 'react';

import { Icon } from '@confeti/design-system/icon';

import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';

import * as styles from './timetable-list-header.css';

export const TimetableListHeader = () => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);

  const toggleSort = () => {
    setSortOption((prev) =>
      prev === SORT_OPTIONS.RECENT
        ? SORT_OPTIONS.ALPHABETICAL
        : SORT_OPTIONS.RECENT,
    );
  };

  return (
    <section className={styles.header}>
      <div className={styles.leftContent}>
        <p>전체 12</p>
        <button className={styles.sort} onClick={toggleSort}>
          <p>{SORT_LABELS[sortOption]}</p>
          <Icon name="switch" size="1.6rem" />
        </button>
      </div>
      <div className={styles.rightContent}>
        <Icon name="edit" size="1.6rem" />
        <p>편집하기</p>
      </div>
    </section>
  );
};
