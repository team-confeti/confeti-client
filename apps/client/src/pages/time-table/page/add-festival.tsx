import { Button, FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import * as styles from './add-festival.css';

const AddFestival = () => {
  return (
    <div className={styles.wrapper}>
      <Header variant="detail" title="페스티벌 추가하기" />
      <div className={styles.container}>
        {PERFORMANCE_DATA.data.performances.map((performance) => (
          <FestivalCard
            key={performance.performanceId}
            festivalId={performance.performanceId}
            title={performance.title}
            imageSrc={performance.posterUrl}
            selectable={true}
          />
        ))}
      </div>
      <div className={styles.buttonSection}>
        <Button
          variant="add"
          text={'추가하기'}
          disabled={false}
          // 클릭 시 타임테이블에 추가되는 로직 작성 예정
        />
      </div>
    </div>
  );
};

export default AddFestival;
