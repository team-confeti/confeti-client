import { Icon } from '@confeti/design-system/icon';

import * as styles from './order-by-button.css';

interface OrderByButtonProps {
  orderByText: string;
  onClick: VoidFunction;
}

const OrderByButton = ({ orderByText, onClick }: OrderByButtonProps) => {
  return (
    <div className={styles.orderByButtonContainer} onClick={onClick}>
      <p className={styles.orderByText}>{orderByText}</p>
      <Icon name="switch" size="1.6rem" />
    </div>
  );
};

export default OrderByButton;
