import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { IcFestivalGray } from '@confeti/design-system/icons';
import * as styles from './empty-festival-section.css';

const EmptyFestivalSection = () => {
  const navigate = useNavigate();

  const handleAddFestivalClick = () => {
    navigate(`${routePath.TIME_TABLE_OUTLET}/${routePath.ADDFESTIVAL}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.iconDescriptionWrapper}>
        <IcFestivalGray className={styles.icon} />
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
