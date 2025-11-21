import { Spacing } from '@confeti/design-system';

import { DetailHeader, Footer } from '@shared/components';

import { TimetableContent } from '@pages/my/components/timetable/timetable-content';

import * as styles from './my-timetable.css';

const MyTimetable = () => {
  return (
    <>
      <DetailHeader title="타임테이블 목록" />
      <TimetableContent />
      <Spacing color="white" className={styles.spacing} />
      <Footer />
    </>
  );
};

export default MyTimetable;
