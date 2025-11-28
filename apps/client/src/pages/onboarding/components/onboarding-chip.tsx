import { Icon } from '@confeti/design-system/icon';

import * as styles from './onboarding-chip.css';

interface Props {
  count: number;
  onClick: () => void;
}

const OnboardingChip = ({ count, onClick }: Props) => {
  return (
    <div className={styles.onboardingCountChipContainer} onClick={onClick}>
      <p className={styles.onboardingCountChip}>{count}</p>
      <Icon name="arrow-horizontal" size="1.3rem" color="gray500" />
    </div>
  );
};

export default OnboardingChip;
