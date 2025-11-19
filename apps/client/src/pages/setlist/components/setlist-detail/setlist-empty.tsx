import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@confeti/design-system';

import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import * as styles from './setlist-empty.css';

const SetListEmpty = () => {
  const navigate = useNavigate();
  const { setlistId } = useParams<{ setlistId: string }>();
  const handleClickAddMusic = () => {
    navigate(
      buildPath(routePath.MY_ADD_SONGS_ABSOLUTE, {
        setlistId: setlistId ?? '',
      }),
    );
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>공연의 셋리스트가 아직 없어요.</h3>
      <p className={styles.subtitle}>
        나만의 셋리스트를 만들어 간직할 수 있어요.
      </p>
      <Button
        className={styles.button}
        text="곡 추가하기"
        onClick={handleClickAddMusic}
      />
    </section>
  );
};

export default SetListEmpty;
