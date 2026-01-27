import { Button, Description } from '@confeti/design-system';

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
          <Button
            text="타임테이블 시작하기"
            variant="add"
            onClick={() => handleNavigate({ isReTry: false })}
          />
          <SkipButton
            onClick={() => handleNavigate({ isReTry: true })}
            text="다시보기"
          />
        </div>
      </div>
    </section>
  );
};

export default ClickBlockStep;
