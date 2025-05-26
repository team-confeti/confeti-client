import { Button, Description } from '@confeti/design-system';
import { ImgOnboard2 } from '@confeti/design-system/icons';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step-one.css';

const StepTwo = () => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description.Text fontSize={20} descriptionText="원하는">
            <Description.Text fontSize={20} descriptionText={' '} />
            <Description.HighlightedText
              fontSize={20}
              highlightedText="페스티벌"
            />
            <Description.Text fontSize={20} descriptionText="과">
              <Description.Text fontSize={20} descriptionText={' '} />
              <Description.HighlightedText
                fontSize={20}
                highlightedText="날짜"
              />
            </Description.Text>
            <Description.Text fontSize={20} descriptionText={`를 선택하고,`} />
            <Description.Text
              fontSize={20}
              descriptionText={'\n타임라인을 확인해요'}
            />
          </Description.Text>
          <ImgOnboard2 width={'100%'} height={'31rem'} />
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

export default StepTwo;
