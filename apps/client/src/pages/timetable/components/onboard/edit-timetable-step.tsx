import { Button, Description } from '@confeti/design-system';

import { LogClickEvent } from '@shared/analytics/logging';

import {
  WithIndex,
  WithNavigate,
  WithNextStep,
} from '@pages/timetable/types/timetable-onboard-type';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

interface EditTimeTableprops extends WithNextStep, WithNavigate, WithIndex {
  totalIndex: number;
  currentIndex: number;
  onboardImage?: string;
}
const EditTimetableStep = ({
  handleNavigate,
  handleNextStep,
  totalIndex,
  currentIndex,
  onboardImage,
}: EditTimeTableprops) => {
  const handleSkip = () => {
    handleNavigate({ isReTry: false });
  };

  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <div className={styles.timeTableDescriptionContainer}>
            <Description.Text fontSize={20} descriptionText={''}>
              <Description.HighlightedText
                fontSize={20}
                highlightedText="타임테이블 편집하기"
              />
              <Description.Text
                fontSize={20}
                descriptionText={`로\n원하는 무대를 강조해\n한눈에 일정을 파악할 수 있어요`}
              />
            </Description.Text>
          </div>
          <img src={onboardImage} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <div className={styles.progressBarContainer}>
            <ProgressBar totalIndex={totalIndex} currentIndex={currentIndex} />
          </div>
          <LogClickEvent
            name="click_timetable_onboarding_action"
            params={{
              step: 'edit_timetable',
              action: 'next',
            }}
          >
            <Button text="다음" variant="add" onClick={handleNextStep} />
          </LogClickEvent>
          <LogClickEvent
            name="click_timetable_onboarding_action"
            params={{
              step: 'edit_timetable',
              action: 'skip',
            }}
          >
            <SkipButton onClick={handleSkip} text="SKIP" />
          </LogClickEvent>
        </div>
      </div>
    </section>
  );
};

export default EditTimetableStep;
