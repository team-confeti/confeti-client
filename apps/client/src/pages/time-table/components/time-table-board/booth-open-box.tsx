import { parseTimeString } from '@pages/time-table/utils';

import * as styles from './booth-open-box.css';

interface BoxProps {
  ticketOpenAt: string;
}

const BoothOpenBox = ({ ticketOpenAt }: BoxProps) => {
  const [openHour, openMin] = parseTimeString(ticketOpenAt);
  return (
    <div className={styles.wrapper}>
      {'TICKET BOOTH OPEN '}
      {openHour}:{openMin}
    </div>
  );
};

export default BoothOpenBox;
