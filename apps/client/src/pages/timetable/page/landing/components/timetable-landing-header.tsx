import { Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './timetable-landing-header.css';

import TimetableLandingBg from '/images/img_timetable_landing_bg.svg';

interface TimetableLandingHeaderProps {
  onCreateTimetable: () => void;
  isEditMode: boolean;
}

const TimetableLandingHeader = ({
  onCreateTimetable,
  isEditMode,
}: TimetableLandingHeaderProps) => {
  return (
    <section className={styles.heroSection}>
      <div
        className={styles.backgroundLayer}
        style={{ backgroundImage: `url(${TimetableLandingBg})` }}
        aria-hidden="true"
      />
      <div className={styles.blurOverlay} aria-hidden="true" />

      <div className={styles.heroContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.mainTitle}>나의 타임테이블</h1>
        </div>

        {!isEditMode && (
          <div className={styles.ctaSection}>
            <Button
              variant="add"
              text="새 타임테이블"
              icon={<Icon name="add" size="2rem" color="gray900" />}
              className={styles.newTimetableButton}
              onClick={onCreateTimetable}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TimetableLandingHeader;
