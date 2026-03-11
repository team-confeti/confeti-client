import { Loader2 } from 'lucide-react';

import * as styles from './loading.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <Loader2 className={styles.spinner} />
    </div>
  );
};

export default Loading;
