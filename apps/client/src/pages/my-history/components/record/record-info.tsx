import * as styles from './record-info.css.ts';

interface Props {
  totalPerformance: number;
  totalTimeTable: number;
  totalSetList: number;
}

const RecordInfo = ({
  totalPerformance,
  totalTimeTable,
  totalSetList,
}: Props) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.item}>
        <h4 className={styles.highlightedTitle}>총 관람 공연</h4>
        <p className={styles.count}>{totalPerformance}회</p>
      </div>
      <div className={styles.item}>
        <h4 className={styles.title}>나의 타임테이블</h4>
        <p className={styles.count}>{totalTimeTable}개</p>
      </div>
      <div className={styles.item}>
        <h4 className={styles.title}>나의 셋리스트</h4>
        <p className={styles.count}>{totalSetList}개</p>
      </div>
    </section>
  );
};

export default RecordInfo;
