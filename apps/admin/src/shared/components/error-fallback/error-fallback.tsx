import { AlertCircle, RefreshCw } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

import * as styles from './error-fallback.css';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styles.container}>
      <AlertCircle className={styles.icon} />
      <h2 className={styles.title}>오류가 발생했습니다</h2>
      <p className={styles.message}>
        {error.message || '알 수 없는 오류가 발생했습니다.'}
      </p>
      <button onClick={resetErrorBoundary} className={styles.retryButton}>
        <RefreshCw size={16} />
        다시 시도
      </button>
    </div>
  );
};

export default ErrorFallback;
