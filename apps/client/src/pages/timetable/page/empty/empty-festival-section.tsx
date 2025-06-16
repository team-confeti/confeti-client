import { useNavigate } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { routePath } from '@shared/router/path';

import * as styles from './empty-festival-section.css';

const EmptyFestivalSection = () => {
  const navigate = useNavigate();

  const { data } = useSuspenseInfiniteQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ADDABLE_FESTIVALS(),
  );

  const isEmpty = data.pages[0]?.festivals.length === 0;

  const handleAddFestivalClick = () => {
    navigate(isEmpty ? routePath.NO_UPCOMING_FESTIVAL : routePath.ADD_FESTIVAL);
  };

  return (
    <section className={styles.container}>
      <div className={styles.iconDescriptionWrapper}>
        <Icon name="fesetival" size="5rem" color="gray300" />
        <h1 className={styles.description}>
          페스티벌을 추가해
          <br />
          나만의 타임테이블을 등록해보세요
        </h1>
      </div>
      <Button
        className={styles.button}
        text="페스티벌 추가하기"
        onClick={handleAddFestivalClick}
      />
    </section>
  );
};

export default EmptyFestivalSection;
