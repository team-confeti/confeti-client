import { LogClickEvent } from '@shared/analytics/logging';

import { PERFORMANCE_LABEL } from '../../constant/performance';

import * as styles from './reservation.css';

interface ReservationItem {
  url: string;
  name: string;
  logoUrl: string;
}

interface Props {
  reservations: ReservationItem[];
}

const Reservation = ({ reservations }: Props) => {
  if (reservations.length === 0) return null;

  const handleOpenReservation = (url: string) => {
    window.open(url, '_blank');
  };

  const reservationItems = reservations.map((reservation, index) => ({
    ...reservation,
    key: `${reservation.url}-${index}`,
    handleClick: () => handleOpenReservation(reservation.url),
  }));

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{PERFORMANCE_LABEL.RESERVATION_OFFICE}</h2>
      <ul className={styles.list}>
        {reservationItems.map(({ key, name, logoUrl, handleClick }) => (
          <li key={key} className={styles.item}>
            <LogClickEvent
              name="click_reservation_link"
              params={{ entry_point: name }}
            >
              <button className={styles.logoButton} onClick={handleClick}>
                <img
                  src={logoUrl}
                  alt={`${name} 로고`}
                  className={styles.logo}
                />
              </button>
            </LogClickEvent>
            <span className={styles.name}>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reservation;
