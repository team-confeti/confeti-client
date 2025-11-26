import * as styles from './empty-performance.css';

const EmptyPerformance = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>선호하는 공연이 아직 없어요.</h1>
      <p className={styles.description}>관심 있는 공연에 하트를 눌러보세요.</p>
    </section>
  );
};

export default EmptyPerformance;
