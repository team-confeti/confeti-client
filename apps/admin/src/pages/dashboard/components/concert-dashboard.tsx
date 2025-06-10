import { FESTIVAL_DATA } from '@shared/mocks/festival-data';

import * as styles from './dashboard.css.ts';

const ConcertDashboard = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>콘서트 제목</th>
            <th className={styles.tableHeader}>콘서트 부제목</th>
            <th className={styles.tableHeader}>공연 날짜</th>
            <th className={styles.tableHeader}>장소</th>
            <th className={styles.tableHeader}>예매일</th>
          </tr>
        </thead>
        <tbody>
          {FESTIVAL_DATA.map((festival) => (
            <tr className={styles.tableRow} key={festival.id}>
              <td className={styles.tableCell}>{festival.title}</td>
              <td className={styles.tableCell}>{festival.subTitle}</td>
              <td className={styles.tableCell}>{festival.date}</td>
              <td className={styles.tableCell}>{festival.place}</td>
              <td className={styles.tableCell}>{festival.reservationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConcertDashboard;
