import { useParams } from 'react-router-dom';

import * as styles from './edit-festival-page.css';

const EditFestivalPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>페스티벌 수정</h1>
      <p>페스티벌 ID: {id}</p>
    </div>
  );
};

export default EditFestivalPage;
