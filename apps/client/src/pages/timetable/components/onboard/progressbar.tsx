import {
  IcIndicatorActive,
  IcIndicatorDefault,
} from '@confeti/design-system/icons';

import * as styles from './progressbar.css';

interface ProgressBarProps {
  totalIndex: number;
  currentIndex: number;
}

const ProgressBar = ({ totalIndex, currentIndex }: ProgressBarProps) => {
  return (
    <div className={styles.progressBarContainer}>
      {Array.from({ length: totalIndex }).map((_, index) =>
        index === currentIndex ? (
          <IcIndicatorActive width={'2.4rem'} height={'0.6rem'} key={index} />
        ) : (
          <IcIndicatorDefault key={index} />
        ),
      )}
    </div>
  );
};

export default ProgressBar;
