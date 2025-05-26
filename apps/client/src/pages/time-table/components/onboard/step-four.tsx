import { Button, Description } from '@confeti/design-system';
import { ImgOnboard4 } from '@confeti/design-system/icons';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

interface StepFourProps {
  handleNextStep: VoidFunction;
  handleNavigate: VoidFunction;
}

const StepThree = ({ handleNavigate, handleNextStep }: StepFourProps) => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description.Text fontSize={20} descriptionText={''}>
            <Description.HighlightedText fontSize={20} highlightedText="블럭" />
            <Description.Text fontSize={20} descriptionText={`을 클릭해서\n`} />
            <Description.Text
              fontSize={20}
              descriptionText={`보고싶은 공연을 표시해요.`}
            />
          </Description.Text>
          <ImgOnboard4 width={'100%'} height={'31rem'} />
          <ProgressBar totalIndex={5} currentIndex={2} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <Button text="다음" variant="add" onClick={handleNextStep} />
          <SkipButton onClick={handleNavigate} />
        </div>
      </div>
    </section>
  );
};

export default StepThree;
