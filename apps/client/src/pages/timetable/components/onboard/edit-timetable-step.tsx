import { Button, Description } from '@confeti/design-system';

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
          <img src={onboardImage} />
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

export default EditTimetableStep;
