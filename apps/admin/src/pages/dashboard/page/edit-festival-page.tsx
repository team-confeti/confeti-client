import { useParams } from 'react-router-dom';

import EditFestivalForm from '../components/edit-festival-form';

import * as styles from './edit-festival-page.css';

const EditFestivalPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>페스티벌 수정하기</h1>
      <section className={styles.section}>
        <EditFestivalForm id={id ?? ''} />
      </section>
    </div>
  );
};

export default EditFestivalPage;
