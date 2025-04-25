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

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{PERFORMANCE_LABEL.RESERVATION_OFFICE}</h2>
      <ul className={styles.list}>
        {reservations.map(({ url, name, logoUrl }, index) => (
          <li key={`${url}-${index}`} className={styles.item}>
            <button
              className={styles.logoButton}
              onClick={() => window.open(url, '_blank')}
            >
              <img src={logoUrl} alt={`${name} 로고`} className={styles.logo} />
            </button>
            <span className={styles.name}>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reservation;
