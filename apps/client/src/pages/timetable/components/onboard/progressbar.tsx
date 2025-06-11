import { Icon } from '@confeti/design-system/icon';

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
          <Icon
            name="indicator-active"
            width="2.4rem"
            height="0.6rem"
            key={index}
          />
        ) : (
          <Icon name="indicator-default" key={index} />
        ),
      )}
    </div>
  );
};

export default ProgressBar;
