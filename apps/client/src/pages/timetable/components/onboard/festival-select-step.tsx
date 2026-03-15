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

interface FestivalSelectProps extends WithNextStep, WithNavigate, WithIndex {
  totalIndex: number;
  currentIndex: number;
  onboardImage?: string;
}

const FestivalSelectStep = ({
  handleNavigate,
  handleNextStep,
  totalIndex,
  currentIndex,
  onboardImage,
}: FestivalSelectProps) => {
  const handleSkip = () => {
    handleNavigate({ isReTry: false });
  };

  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <div className={styles.timeTableDescriptionContainer}>
            <Description.Text fontSize={20} descriptionText="원하는">
              <Description.HighlightedText
                fontSize={20}
                highlightedText="페스티벌을 추가"
              />
              <Description.Text
                fontSize={20}
                descriptionText={'해\n여러 페스티벌 일정을 한 곳에서 확인해요'}
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
              step: 'festival_select',
              action: 'next',
            }}
          >
            <Button text="다음" variant="add" onClick={handleNextStep} />
          </LogClickEvent>
          <LogClickEvent
            name="click_timetable_onboarding_action"
            params={{
              step: 'festival_select',
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

export default FestivalSelectStep;
