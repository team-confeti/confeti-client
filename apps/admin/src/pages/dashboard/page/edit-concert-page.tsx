import { useParams } from 'react-router-dom';

import EditConcertForm from '../components/edit-concert-form';

import * as styles from './edit-concert-page.css';

const EditConcertPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>콘서트 수정하기</h1>
      <section className={styles.section}>
        <EditConcertForm id={id ?? ''} />
      </section>
    </div>
  );
};

export default EditConcertPage;
