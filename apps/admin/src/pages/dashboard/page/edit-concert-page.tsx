import { useParams } from 'react-router-dom';

import * as styles from './edit-concert-page.css';

const EditConcertPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>콘서트 수정</h1>
      <p>콘서트 ID: {id}</p>
    </div>
  );
};

export default EditConcertPage;
