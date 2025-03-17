import { ReactNode } from 'react';
import * as styles from './ticketing-card.css';
import InfoButton from './info-button/info-button';

interface TicketingCardRootProps {
  children: ReactNode;
}
interface TicketingCardProps {
  performances: {
    index: number;
    reservationBgUrl: string;
    subtitle: string;
    reserveAt: string;
    typeId: number;
    type: string;
  }[];
}

const Root = ({ children }: TicketingCardRootProps) => {
  return <div className={styles.root}>{children}</div>;
};

const Card = ({ performances }: TicketingCardProps) => {
  return (
    <div className={styles.card}>
      {performances.map((performance) => (
        <div key={performance.index} className={styles.textSection}>
          <p className={styles.Dday}>D-Day</p>
          <span className={styles.subTitle}>{performance.subtitle}</span>
          <div className={styles.ticketInfoSection}>
            <InfoButton title={'티켓 정보 확인하기'} />
          </div>
        </div>
      ))}
    </div>
  );
};

const TicketingCard = {
  Root: Root,
  Card: Card,
};

export default TicketingCard;
