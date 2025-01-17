import * as styles from './calender.css';

interface CalenderProps {
  festivalDates: { festivalDateId: number; festivalAt: string }[];
}

const Calender = ({ festivalDates }: CalenderProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.yearSection}></div>
      <div className={styles.dateSection}>
        {festivalDates.map(({ festivalDateId, festivalAt }) => (
          <div className={styles.dateItems} key={festivalDateId}>
            <span className={styles.dayNum}>{festivalAt.split('.')[1]}</span>
            <span className={styles.dayKo}>{festivalAt.split('.')[0]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Calender;
