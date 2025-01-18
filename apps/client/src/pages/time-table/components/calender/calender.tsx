import * as styles from './calender.css';
import {
  useFormattedYear,
  useFormattedWeek,
  useDayNumSelection,
  createFestivalDateMap,
  checkFestivalDateStatus,
} from '@pages/time-table/hooks/use-data-formatted';

interface CalenderProps {
  festivalDates: { festivalDateId: number; festivalAt: string }[];
}

const Calender = ({ festivalDates }: CalenderProps) => {
  const firstDate = festivalDates[0]?.festivalAt;
  const { weekDays } = useFormattedWeek(firstDate);
  const { selectedDayNumeId, handleDayNumClick } = useDayNumSelection();
  const festivalDateMap = createFestivalDateMap(festivalDates);

  // dateItems를 미리 매핑하여 데이터를 준비
  const dateItems = weekDays.map((day, id) => ({
    ...day,
    ...checkFestivalDateStatus(festivalDateMap, id, selectedDayNumeId),
  }));

  return (
    <section className={styles.container}>
      <div className={styles.yearSection}>
        <span>{useFormattedYear(firstDate)}</span>
      </div>
      <div className={styles.dateSection}>
        {dateItems.map(({ date, dayKo, festivalDateId, isSelected }) => (
          <div className={styles.dateItems} key={festivalDateId}>
            <span
              className={`${styles.dayNum} ${
                isSelected ? styles.selectedDayNum : ''
              }`}
              onClick={() =>
                festivalDateId && handleDayNumClick(festivalDateId)
              }
            >
              {date}
            </span>
            <span className={styles.dayKo}>{dayKo}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Calender;
