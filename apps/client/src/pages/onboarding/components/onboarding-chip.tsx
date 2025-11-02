import { Icon } from '@confeti/design-system/icon';

import * as styles from './onboarding-chip.css';

interface Props {
  count: number;
}

const OnboardingChip = ({ count }: Props) => {
  return (
    <div className={styles.onboardingCountChipContainer}>
      <p className={styles.onboardingCountChip}>{count}</p>
      <Icon name="arrow-horizontal" size="1.3rem" color="gray500" />
    </div>
  );
};

export default OnboardingChip;
