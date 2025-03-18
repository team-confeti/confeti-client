import { parseTimeString } from '@pages/time-table/utils';

import * as styles from './booth-open-box.css';
interface BoxProps {
  ticketOpenHour: string;
}

const BoothOpenBox = ({ ticketOpenHour }: BoxProps) => {
  const [openHour, openMin] = parseTimeString(ticketOpenHour);
  return (
    <div className={styles.wrapper}>
      {'TICKET BOOTH OPEN '}
      {openHour}:{openMin}
    </div>
  );
};

export default BoothOpenBox;
