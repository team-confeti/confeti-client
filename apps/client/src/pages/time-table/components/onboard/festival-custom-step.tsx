import { Button, Description } from '@confeti/design-system';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

import ImgOnboard3 from '/images/img_onboard_3.svg';

interface StepThreeProps {
  handleNextStep: VoidFunction;
  handleNavigate: ({ isReTry }: { isReTry: boolean }) => void;
}

const FestivalCustomStep = ({
  handleNavigate,
  handleNextStep,
}: StepThreeProps) => {
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
          <img src={ImgOnboard3} />
          <ProgressBar totalIndex={5} currentIndex={1} />
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

export default FestivalCustomStep;
