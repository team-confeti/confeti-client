import { Button, Description } from '@confeti/design-system';
import { ImgOnboard6 } from '@confeti/design-system/icons';

import ProgressBar from './progressbar';
import SkipButton from './skip-button';

import * as styles from './step.css';

interface StepSixProps {
  handleNavigate: ({ isReTry }: { isReTry: boolean }) => void;
}

const StepSix = ({ handleNavigate }: StepSixProps) => {
  return (
    <section className={styles.timeTableOnboardContainer}>
      <div className={styles.timeTableOnboardContent}>
        <div className={styles.timeTableImageContainer}>
          <Description.Text fontSize={20} descriptionText={''}>
            <Description.HighlightedText
              fontSize={20}
              highlightedText="이미지 저장"
            />
            <Description.Text fontSize={20} descriptionText={`을 통해\n`} />
            <Description.Text
              fontSize={20}
              descriptionText={`오프라인에서도 타임테이블 확인!`}
            />
          </Description.Text>
          <ImgOnboard6 width={'100%'} height={'31rem'} />
          <ProgressBar totalIndex={5} currentIndex={4} />
        </div>
        <div className={styles.timeTableOnboardButtonContainer}>
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

export default StepSix;
