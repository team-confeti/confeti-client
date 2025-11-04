import { Avatar, Chip } from '@confeti/design-system';

import * as styles from './timetable-list.css';

interface TimetableItem {
  id: number;
  posterUrl: string;
  title: string;
  dDay: string;
}

interface Props {
  timetables: TimetableItem[];
}

export const TimetableList = ({ timetables }: Props) => {
  return (
    <ul className={styles.wrapper}>
      {timetables.map((timetable) => (
        <li key={timetable.id} className={styles.item}>
          <Avatar
            src={timetable.posterUrl}
            alt={timetable.title}
            size="md"
            isHandleClick={false}
            className={styles.avatar}
          />
          <div>
            {/* TODO: 실제 Chip로직에 맞게 수정 */}
            <Chip className={styles.chip} variant="choice">
              {timetable.dDay}
            </Chip>
            <h2 className={styles.title}>{timetable.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};
