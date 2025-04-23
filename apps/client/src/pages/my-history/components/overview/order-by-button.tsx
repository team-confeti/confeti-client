import SvgIcSwitch from 'node_modules/@confeti/design-system/src/icons/src/IcSwitch';

import * as styles from './order-by-button.css';

const SORT_LABELS = {
  RECENT: '최근추가순',
  OLDEST: '오래된순',
} as const;

const OrderByButton = () => {
  return (
    <div className={styles.orderByButtonContainer}>
      <p className={styles.orderByText}>{SORT_LABELS.RECENT}</p>
      <SvgIcSwitch width={'1.6rem'} height={'1.6rem'} />
    </div>
  );
};

export default OrderByButton;
