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

interface ClickBlockProps extends WithNextStep, WithNavigate, WithIndex {
  totalIndex: number;
  currentIndex: number;
  onboardImage?: string;
}

const ClickBlockStep = ({
  handleNavigate,
  totalIndex,
  currentIndex,
  onboardImage,
}: ClickBlockProps) => {
  const handleStartTimetable = () => {
    handleNavigate({ isReTry: false });
  };

  const handleRetry = () => {
    handleNavigate({ isReTry: true });
  };

  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <div className={styles.timeTableDescriptionContainer}>
            <Description.Text
              fontSize={20}
              descriptionText={'완성한 타임테이블은\n'}
            >
              <Description.HighlightedText
                fontSize={20}
                highlightedText={`이미지 저장하기`}
              />
              <Description.Text
                fontSize={20}
                descriptionText={`로\n오프라인에서도 쉽게 확인 가능!`}
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
              entry_point: 'click_block',
              action: 'start',
            }}
          >
            <Button
              text="타임테이블 시작하기"
              variant="add"
              onClick={handleStartTimetable}
            />
          </LogClickEvent>
          <LogClickEvent
            name="click_timetable_onboarding_action"
            params={{
              entry_point: 'click_block',
              action: 'retry',
            }}
          >
            <SkipButton text="다시보기" onClick={handleRetry} />
          </LogClickEvent>
        </div>
      </div>
    </section>
  );
};

export default ClickBlockStep;
