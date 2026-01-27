import { Button, Description } from '@confeti/design-system';

import {
  WithIndex,
  WithNavigate,
  WithNextStep,
} from '@pages/timetable/types/timetable-onboard-type';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

interface FestivalCustomProps extends WithNextStep, WithNavigate, WithIndex {
  totalIndex: number;
  currentIndex: number;
  onboardImage?: string;
}

const FestivalCustomStep = ({
  handleNavigate,
  handleNextStep,
  totalIndex,
  currentIndex,
  onboardImage,
}: FestivalCustomProps) => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <div className={styles.timeTableDescriptionContainer}>
            <Description.Text fontSize={20} descriptionText={''}>
              <Description.HighlightedText
                fontSize={20}
                highlightedText="페스티벌을 삭제"
              />
              <Description.Text fontSize={20} descriptionText={`해\n`} />
              <Description.Text
                fontSize={20}
                descriptionText={`더 효율적으로 일정을 관리해요`}
              />
            </Description.Text>
          </div>
          <img src={onboardImage} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <div className={styles.progressBarContainer}>
            <ProgressBar totalIndex={totalIndex} currentIndex={currentIndex} />
          </div>
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
