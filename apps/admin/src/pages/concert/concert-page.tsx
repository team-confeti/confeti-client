import ConcertForm from './components/concert-form';

import * as styles from './concert-page.css';

const ConcertPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>콘서트 등록하기</h1>
      <section className={styles.section}>
        <ConcertForm />
      </section>
    </div>
  );
};

export default ConcertPage;
