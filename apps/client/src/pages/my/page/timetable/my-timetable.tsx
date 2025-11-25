import { Spacing } from '@confeti/design-system';

import { DetailHeader, Footer } from '@shared/components';

import { TimetableContainer } from '@pages/my/components/timetable/timetable-container';

import * as styles from './my-timetable.css';

const MyTimetable = () => {
  return (
    <>
      <DetailHeader title="타임테이블 목록" />
      <TimetableContainer />
      <Spacing color="white" className={styles.spacing} />
      <Footer />
    </>
  );
};

export default MyTimetable;
