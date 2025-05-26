import { Button, Description } from '@confeti/design-system';
import { ImgOnboard3 } from '@confeti/design-system/icons';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

const StepThree = () => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description.Text fontSize={20} descriptionText={''}>
            <Description.HighlightedText
              fontSize={20}
              highlightedText="페스티벌 추가/삭제"
            />
            <Description.Text
              fontSize={20}
              descriptionText={`로 \n원하는 타임테이블을 커스텀해요.`}
            />
          </Description.Text>
          <ImgOnboard3 width={'100%'} height={'31rem'} />
          <ProgressBar totalIndex={5} currentIndex={1} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <Button text="다음" variant="add" />
          <SkipButton />
        </div>
      </div>
    </section>
  );
};

export default StepThree;
