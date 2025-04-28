import { Description } from '@confeti/design-system';

import * as styles from './step-one.css';

const StepOne = () => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <Description
          descriptionText="나만의 타임테이블을 만들고,\n이미지 저장까지 간편하게!"
          fontSize={20}
        />
      </div>
    </section>
  );
};

export default StepOne;
