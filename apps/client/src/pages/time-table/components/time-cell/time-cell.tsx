import * as styles from './time-cell.css';

interface TimeCellProps {
  isHalfHourOpen: boolean;
  hour: number;
}

const TimeCell = ({ isHalfHourOpen, hour }: TimeCellProps) => {
  const timeItems = [
    {
      time: isHalfHourOpen ? 30 : hour,
      bold: !isHalfHourOpen,
    },
    {
      time: isHalfHourOpen ? hour : 30,
      bold: isHalfHourOpen,
    },
  ];

  return (
    <>
      {timeItems.map(({ time, bold }, idx) => (
        <div className={styles.timeList} key={idx}>
          <p className={styles.timeP({ bold })}>{time}</p>
          <hr className={styles.timeBar({ bold })} />
        </div>
      ))}
    </>
  );
};

export default TimeCell;
