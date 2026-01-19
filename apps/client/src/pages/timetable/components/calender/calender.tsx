import { Icon } from '@confeti/design-system/icon';

import * as styles from './calender.css';

interface FestivalDate {
  festivalDateId: number;
  festivalAt: string;
}

interface CalenderProps {
  festivalDates: FestivalDate[];
  selectedDateId: number;
  onDateSelect: (dateId: number) => void;
  posterUrl: string;
}

const DAY_OF_WEEK_MAP: Record<number, string> = {
  0: '일요일',
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
  6: '토요일',
};

// TODO: API 연동 후 삭제해야함
const formatDateWithDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = DAY_OF_WEEK_MAP[date.getDay()];
  return `${month}월 ${day}일 ${dayOfWeek}`;
};

const Calender = ({
  festivalDates,
  selectedDateId,
  onDateSelect,
  posterUrl,
}: CalenderProps) => {
  const currentIndex = festivalDates.findIndex(
    (date) => date.festivalDateId === selectedDateId,
  );
  const currentDate = festivalDates[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onDateSelect(festivalDates[currentIndex - 1].festivalDateId);
    }
  };

  const handleNext = () => {
    if (currentIndex < festivalDates.length - 1) {
      onDateSelect(festivalDates[currentIndex + 1].festivalDateId);
    }
  };

  if (!currentDate) return null;

  return (
    <section className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={posterUrl} alt="calendar" className={styles.calendarImage} />
        <div className={styles.overlay} />
        <div className={styles.dateInfoWrapper}>
          {currentIndex > 0 ? (
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrev}
            >
              <Icon
                name="arrow-horizontal"
                size="1.6rem"
                rotate={180}
                color="white"
              />
            </button>
          ) : (
            <div className={styles.navButtonPlaceholder} />
          )}
          <div className={styles.dateInfo}>
            <p className={styles.dateText}>
              {formatDateWithDayOfWeek(currentDate.festivalAt)}
            </p>
            <p className={styles.dayText}>DAY {currentIndex + 1}</p>
          </div>
          {currentIndex < festivalDates.length - 1 ? (
            <button
              type="button"
              className={styles.navButton}
              onClick={handleNext}
            >
              <Icon name="arrow-horizontal" size="1.6rem" color="white" />
            </button>
          ) : (
            <div className={styles.navButtonPlaceholder} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Calender;
