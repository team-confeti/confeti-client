import * as styles from './booth-open-box.css';
interface BoxProps {
  ticketOpenHour: string;
}

const BoothOpenBox = ({ ticketOpenHour }: BoxProps) => {
  return (
    <div className={styles.wrapper}>
      {'TICKET BOOTH OPEN '}
      {ticketOpenHour.slice(0, 5)}
    </div>
  );
};

export default BoothOpenBox;
