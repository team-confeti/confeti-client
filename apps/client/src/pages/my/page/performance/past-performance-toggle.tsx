import { Toggle } from '@confeti/design-system';

import * as styles from './past-performance-toggle.css';

interface PastPerformanceToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PastPerformanceToggle = ({
  checked,
  onChange,
}: PastPerformanceToggleProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>지난 공연 숨기기</p>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
};
