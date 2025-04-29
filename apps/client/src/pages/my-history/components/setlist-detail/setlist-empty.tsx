import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';

import * as styles from './setlist-empty.css';

const SetListEmpty = () => {
  const navigate = useNavigate();

  const handleClickAddMusic = () => {
    navigate(routePath.MY_HISTORY_REQUIRE_LOGIN);
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>공연의 셋리스트가 아직 없어요</h3>
      <p className={styles.subtitle}>
        나만의 셋리스트를 만들어 간직할 수 있어요
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
