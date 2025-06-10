import FestivalForm from './components/festival-form';

import * as styles from './festival-page.css';

const FestivalPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>페스티벌 등록하기</h1>
      <section className={styles.section}>
        <FestivalForm />
      </section>
    </div>
  );
};

export default FestivalPage;
