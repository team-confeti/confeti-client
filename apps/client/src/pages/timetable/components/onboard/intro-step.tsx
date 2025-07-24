import { Button, Description } from '@confeti/design-system';
import { cn } from '@confeti/utils';

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
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description.Text
            descriptionText={
              '나만의 타임테이블을 만들고,\n이미지 저장까지 간편하게!'
            }
            fontSize={20}
          />
          <img src={onboardImage} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <Button
            text="타임테이블 사용법 알아보기"
            variant="add"
            onClick={handleNextStep}
          />
          <Button
            text="타임테이블 바로 시작하기"
            variant="add"
            className={cn(styles.customAddButton)}
            onClick={() => handleNavigate({ isReTry: false })}
          />
        </div>
      </div>
    </section>
  );
};

export default ItroStep;
