import SvgIcArrowWhite12 from '../../../icons/src/IcArrowWhite12';
import * as styles from './info-button.css';

interface InfoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  typeId?: number;
  performanceType?: string;
}

const InfoButton = ({ title }: InfoButtonProps) => {
  return (
    <button className={styles.performanceInfo}>
      {title}
      <SvgIcArrowWhite12 width={'1.2rem'} height={'1.2rem'} />
    </button>
  );
};

export default InfoButton;
