import SvgIcSwitch from 'node_modules/@confeti/design-system/src/icons/src/IcSwitch';

import * as styles from './order-by-button.css';

interface OrderByButtonProps {
  orderByText: string;
  onClick: () => void;
}

const OrderByButton = ({ orderByText, onClick }: OrderByButtonProps) => {
  return (
    <div className={styles.orderByButtonContainer} onClick={onClick}>
      <p className={styles.orderByText}>{orderByText}</p>
      <SvgIcSwitch width="1.6rem" height="1.6rem" />
    </div>
  );
};

export default OrderByButton;
