import { Button, Description } from '@confeti/design-system';
import { ImgOnboard1 } from '@confeti/design-system/icons';
import { cn } from '@confeti/design-system/utils';

import * as styles from './step.css';
interface StepOneProps {
  handleNextStep: VoidFunction;
  handleNavigate: VoidFunction;
}

const StepOne = ({ handleNextStep, handleNavigate }: StepOneProps) => {
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
          <ImgOnboard1 width={'100%'} height={'31rem'} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
          <Button
            text="타임 테이블 사용법 알아보기"
            variant="add"
            onClick={handleNextStep}
          />
          <Button
            text="타임 테이블 바로 시작하기"
            variant="add"
            className={cn(styles.customAddButton)}
            onClick={handleNavigate}
          />
        </div>
      </div>
    </section>
  );
};

export default StepOne;
