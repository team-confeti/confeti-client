import { Button, Description } from '@confeti/design-system';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

import ImgOnboard4 from '/images/img_onboard_4.svg';

interface StepFourProps {
  handleNextStep: VoidFunction;
  handleNavigate: ({ isReTry }: { isReTry: boolean }) => void;
}

const StepThree = ({ handleNavigate, handleNextStep }: StepFourProps) => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description.Text fontSize={20} descriptionText={''}>
            <Description.HighlightedText
              fontSize={20}
              highlightedText="타임테이블 편집하기"
            />
            <Description.Text
              fontSize={20}
              descriptionText={`로\n테이블을 커스텀해요`}
            />
          </Description.Text>
          <img src={ImgOnboard4} />
          <ProgressBar totalIndex={5} currentIndex={2} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <Button text="다음" variant="add" onClick={handleNextStep} />
          <SkipButton
            onClick={() => handleNavigate({ isReTry: false })}
            text="SKIP"
          />
        </div>
      </div>
    </section>
  );
};

export default StepThree;
