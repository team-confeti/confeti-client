import { useState } from 'react';

import { Toggle } from '@confeti/design-system';

import * as styles from './past-performance-toggle.css';

export const PastPerformanceToggle = () => {
  const [hidePastPerformances, setHidePastPerformances] = useState(false);

  return (
    <div className={styles.container}>
      <p className={styles.title}>지난 공연 숨기기</p>
      <Toggle
        checked={hidePastPerformances}
        onChange={(checked) => {
          setHidePastPerformances(checked);
          // TODO: 지난 공연 필터링 로직 추가 + 핸들러 부모에서 받아야함
        }}
      />
    </div>
  );
};
