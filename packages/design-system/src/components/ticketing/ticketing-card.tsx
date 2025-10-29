import { type ReactNode } from 'react';

import { Icon } from '../../icons';

import * as styles from './ticketing-card.css';
interface TicketingImageProps {
  textContent: ReactNode;
  performanceInfoContent: ReactNode;
  imageUrl: string;
}

interface TicketingDdayProps {
  reserveAt: string;
  startTime: string;
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

// TODO: 서버 응답에 맞춰서 변경
const Dday = ({ reserveAt, startTime }: TicketingDdayProps) => {
  return (
    <div className={styles.ddayContainer}>
      <p>{reserveAt}</p>
      <p>{startTime}</p>
    </div>
  );
};

const Subtitle = ({ subtitle }: TicketingSubtitleProps) => {
  return <span className={styles.subTitle}>{subtitle}</span>;
};

const PerformanceInfo = ({ onClick, title }: TicketingPerformanceInfoProps) => {
  return (
    <button onClick={onClick} className={styles.performanceInfoButton}>
      {title}
      <Icon name="arrow-horizontal" size="1.3rem" color="white" />
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
