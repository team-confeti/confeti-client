import { Skeleton } from '@confeti/design-system';

import * as styles from './skeleton-list.css';

const SkeletonList = () => {
  return (
    <>
      <div className={styles.listContainer}>
        <ul className={styles.listContentContainer}>
          <li className={styles.listImageItems}>
            <Skeleton width={'6.8rem'} height={'6.8rem'} />
          </li>
          <li className={styles.listTextItems}>
            <Skeleton width={'21rem'} height={'1.9rem'} />
            <Skeleton width={'15rem'} height={'1.5rem'} />
          </li>
        </ul>
        <Skeleton width={'2.4rem'} height={'2.4rem'} />
      </div>
    </>
  );
};

export default SkeletonList;
