import {
  WithNavigate,
  WithNextStep,
} from '@pages/time-table/types/time-table-onboard-type';

import { Button, Description } from '@confeti/design-system';
import { cn } from '@confeti/design-system/utils';

import * as styles from './step.css';

import ImgOnboard1 from '/images/img_onboard_1.svg';

type IntroProps = WithNavigate & WithNextStep;

const ItroStep = ({ handleNextStep, handleNavigate }: IntroProps) => {
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
          <img src={ImgOnboard1} />
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
            onClick={() => handleNavigate({ isReTry: false })}
          />
        </div>
      </div>
    </section>
  );
};

export default ItroStep;
