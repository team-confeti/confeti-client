import {
  WithIndex,
  WithNavigate,
  WithNextStep,
} from '@pages/timetable/types/timetable-onboard-type';

import { Button, Description } from '@confeti/design-system';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

import ImgOnboard5 from '/images/img_onboard_5.svg';

type ClickBlockProps = WithNavigate & WithNextStep & WithIndex;

const ClickBlockStep = ({
  handleNavigate,
  handleNextStep,
  totalIndex,
  currentIndex,
}: ClickBlockProps) => {
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
          <img src={ImgOnboard5} />
          <ProgressBar totalIndex={totalIndex} currentIndex={currentIndex} />
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

export default ClickBlockStep;
