import { ReactNode } from 'react';

import SvgIcArrowWhite12 from '../../icons/src/IcArrowWhite12';

import * as styles from './ticketing-card.css';
interface TicketingImageProps {
  textContent: ReactNode;
  performanceInfoContent: ReactNode;
  imageUrl: string;
}

interface TicketingDdayProps {
  reserveAt: string;
}

interface TicketingSubtitleProps {
  subtitle: string;
}

interface TicketingPerformanceInfoProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  title: string;
  typeId: number;
  performanceType?: string;
}

const Image = ({
  textContent,
  performanceInfoContent,
  imageUrl,
}: TicketingImageProps) => {
  return (
    <div
      className={styles.imageField}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.textField}>{textContent}</div>
      <div>{performanceInfoContent}</div>
    </div>
  );
};

const Dday = ({ reserveAt }: TicketingDdayProps) => {
  return <p className={styles.Dday}>{reserveAt}</p>;
};

const Subtitle = ({ subtitle }: TicketingSubtitleProps) => {
  return <span className={styles.subTitle}>{subtitle}</span>;
};

const PerformanceInfo = ({ onClick, title }: TicketingPerformanceInfoProps) => {
  return (
    <button onClick={onClick} className={styles.performanceInfoButton}>
      {title}
      <SvgIcArrowWhite12 width={'1.2rem'} height={'1.2rem'} />
    </button>
  );
};

const TicketingCard = {
  Image: Image,
  Dday: Dday,
  SubTitle: Subtitle,
  PerformanceInfo: PerformanceInfo,
};

export default TicketingCard;
