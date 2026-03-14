import { Button, Description } from '@confeti/design-system';
import { cn } from '@confeti/utils';

import { LogClickEvent } from '@shared/analytics/logging';

import {
  WithNavigate,
  WithNextStep,
} from '@pages/timetable/types/timetable-onboard-type';

import * as styles from './step.css';

interface IntroProps extends WithNextStep, WithNavigate {
  onboardImage?: string;
}

const ItroStep = ({
  handleNextStep,
  handleNavigate,
  onboardImage,
}: IntroProps) => {
  const handleStartTimetable = () => {
    handleNavigate({ isReTry: false });
  };

  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <div className={styles.timeTableDescriptionContainer}>
            <Description.Text
              descriptionText={
                '나만의 타임테이블을 만들어,\n페스티벌 일정을 쉽게 확인해 보세요 :)'
              }
              fontSize={20}
            />
          </div>
          <img src={onboardImage} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <LogClickEvent
            name="click_timetable_onboarding_action"
            params={{
              step: 'intro',
              action: 'next',
            }}
          >
            <Button
              text="타임테이블 사용법 알아보기"
              variant="add"
              onClick={handleNextStep}
            />
          </LogClickEvent>
          <LogClickEvent
            name="click_timetable_onboarding_action"
            params={{
              step: 'intro',
              action: 'start',
            }}
          >
            <Button
              text="타임테이블 바로 시작하기"
              variant="add"
              className={cn(styles.customAddButton)}
              onClick={handleStartTimetable}
            />
          </LogClickEvent>
        </div>
      </div>
    </section>
  );
};

export default ItroStep;
