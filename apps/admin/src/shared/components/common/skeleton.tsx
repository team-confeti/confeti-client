import * as styles from './skeleton.css';

interface SkeletonTextProps {
  width?: string;
  height?: string;
}

export const SkeletonText = ({
  width = '100%',
  height = '1.6rem',
}: SkeletonTextProps) => (
  <div className={styles.shimmer} style={{ width, height }} />
);

export const SkeletonCard = () => (
  <div className={styles.cardWrapper}>
    <div className={`${styles.shimmer} ${styles.cardImage}`} />
    <div
      style={{
        padding: '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
      }}
    >
      <div
        className={`${styles.shimmer} ${styles.cardLine}`}
        style={{ width: '80%' }}
      />
      <div
        className={`${styles.shimmer} ${styles.cardLine}`}
        style={{ width: '60%' }}
      />
    </div>
  </div>
);

export const SkeletonTable = ({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) => (
  <div className={styles.tableWrapper}>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className={styles.tableRow}
        style={{ '--cols': cols } as React.CSSProperties}
      >
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className={`${styles.shimmer} ${styles.tableCell}`} />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonDashboard = () => (
  <div className={styles.dashboardWrapper}>
    <div className={styles.dashboardCards}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`${styles.shimmer} ${styles.dashboardCard}`} />
      ))}
    </div>
    <div className={styles.tableWrapper}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`${styles.shimmer} ${styles.tableCell}`}
          style={{ height: '4.8rem', marginBottom: '0.8rem' }}
        />
      ))}
    </div>
  </div>
);
