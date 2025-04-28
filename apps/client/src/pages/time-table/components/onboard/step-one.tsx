import { Button, Description } from '@confeti/design-system';
import { ImgOnboard1 } from '@confeti/design-system/icons';

import * as styles from './step-one.css';

const StepOne = () => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description
            descriptionText={
              '나만의 타임테이블을 만들고,\n이미지 저장까지 간편하게!'
            }
            fontSize={20}
          />
          <ImgOnboard1 width={'100%'} height={'100%'} />
        </div>
        <Button text="타임 테이블 사용법 알아보기" variant="add" />
      </div>
    </section>
  );
};

export default StepOne;
