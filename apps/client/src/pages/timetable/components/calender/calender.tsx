import {
  checkFestivalDateStatus,
  createFestivalDateMap,
  useFormattedWeek,
} from '@pages/timetable/hooks/use-data-formatted';

import { cn } from '@confeti/design-system/utils';

import { formatDate } from '@shared/utils/format-date';

import * as styles from './calender.css';

interface CalenderProps {
  festivalDates: { festivalDateId: number; festivalAt: string }[];
  onDateSelect: (dateId: number) => void;
  selectedDateId: number;
}

const Calender = ({
  festivalDates,
  onDateSelect,
  selectedDateId,
}: CalenderProps) => {
  const firstDate = festivalDates?.[0]?.festivalAt || '';
  const { weekDays } = useFormattedWeek(firstDate);
  const festivalDateMap = createFestivalDateMap(festivalDates || []);

  const formattedYear = formatDate(firstDate, 'koHalf');

  const handleDateClick = (festivalDateId: number) => {
    onDateSelect(festivalDateId);
  };

  if (!festivalDates || festivalDates.length === 0) {
    return (
      <section className={styles.noDataContainer}>
        <div className={styles.yearSection}>
          <p>{formattedYear}</p>
        </div>
        <div className={styles.dateSection}></div>
      </section>
    );
  }

  const dateDetails = weekDays.map((day, id) => ({
    ...day,
    ...checkFestivalDateStatus(festivalDateMap, id, selectedDateId),
  }));

  return (
    <section className={styles.container}>
      <div className={styles.yearSection}>
        <p>{formattedYear}</p>
      </div>
      <div className={styles.dateSection}>
        {dateDetails.map(
          ({ date, dayKo, festivalDateId, isSelected, hasFestivalDate }) => (
            <div className={styles.dateItems} key={date}>
              <p
                className={cn(styles.dayNum({ isSelected, hasFestivalDate }))}
                onClick={() =>
                  festivalDateId && handleDateClick(festivalDateId)
                }
              >
                {date}
              </p>
              <p
                className={cn(styles.dayKo({ hasFestivalDate }))}
                onClick={() =>
                  festivalDateId && handleDateClick(festivalDateId)
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
