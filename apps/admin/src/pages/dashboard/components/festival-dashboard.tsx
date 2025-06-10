import { useNavigate } from 'react-router-dom';

import { PATH } from '@shared/constants/path';
import { FESTIVAL_DATA } from '@shared/mocks/festival-data';

import * as styles from './dashboard.css.ts';

const FestivalDashboard = () => {
  const navigate = useNavigate();

  // TODO: client의 generatePath를 packages에 추가하고 사용하기
  const handleRowClick = (id: string) => {
    navigate(`${PATH.EDIT_FESTIVAL.replace(':id', id)}`);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>페스티벌 제목</th>
            <th className={styles.tableHeader}>페스티벌 부제목</th>
            <th className={styles.tableHeader}>페스티벌 날짜</th>
            <th className={styles.tableHeader}>장소</th>
            <th className={styles.tableHeader}>예매일</th>
          </tr>
        </thead>
        <tbody>
          {FESTIVAL_DATA.map((festival) => (
            <tr
              className={styles.tableRow}
              key={festival.id}
              onClick={() => handleRowClick(festival.id.toString())}
            >
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

export default FestivalDashboard;
