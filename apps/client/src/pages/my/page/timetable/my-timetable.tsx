import { DetailHeader, Footer } from '@shared/components';

import * as styles from './my-timetable.css';

const MyTimetable = () => {
  return (
    <>
      <DetailHeader title="나의 타임테이블" />
      <section className={styles.container}>
        <p className={styles.emptyMessage}>타임테이블 목록</p>
      </section>
      <Footer />
    </>
  );
};

export default MyTimetable;
