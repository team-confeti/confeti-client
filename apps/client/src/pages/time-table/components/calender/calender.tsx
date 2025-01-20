import * as styles from './calender.css';
import { cn } from '@confeti/design-system/utils';
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
  const firstDate = festivalDates[0].festivalAt;
  const { weekDays } = useFormattedWeek(firstDate);
  const festivalDateMap = createFestivalDateMap(festivalDates);
  const { selectedDayNumId, handleDayNumClick } = useDayNumSelection(
    weekDays[0].date,
  );
  const dateDetails = weekDays.map((day, id) => ({
    ...day,
    ...checkFestivalDateStatus(festivalDateMap, id, selectedDayNumId),
  }));
  console.log('firstDate', festivalDates[0].festivalAt);
  console.log('weekDays', weekDays);
  console.log('festivalDateMap', festivalDateMap);
  console.log('festivalDateMap', festivalDateMap.get(1));

  return (
    <section className={styles.container}>
      <div className={styles.yearSection}>
        <p>{useFormattedYear(firstDate)}</p>
      </div>
      <div className={styles.dateSection}>
        {dateDetails.map(
          ({ date, dayKo, festivalDateId, isSelected, hasFestivalDate }) => (
            <div className={styles.dateItems} key={date}>
              <p
                className={cn(styles.dayNum({ isSelected, hasFestivalDate }))}
                onClick={() =>
                  festivalDateId && handleDayNumClick(festivalDateId)
                }
              >
                {date}
              </p>
              <p
                className={cn(styles.dayKo({ hasFestivalDate }))}
                onClick={() =>
                  festivalDateId && handleDayNumClick(festivalDateId)
                }
              >
                {dayKo}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default Calender;
