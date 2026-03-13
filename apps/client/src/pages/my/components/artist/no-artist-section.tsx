import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';

import { LogClickEvent } from '@shared/analytics/logging';
import { routePath } from '@shared/router/path';

import * as styles from './no-artist-section.css';

const NoArtistSection = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routePath.SEARCH);
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        {`관심있는 아티스트가 궁금해요! \n
                아티스트를 선택하러 가볼까요?`}
      </p>

      <div className={styles.button}>
        <LogClickEvent
          name="click_my_profile_select_artist"
          params={{ source_page: 'my_profile' }}
        >
          <Button text="아티스트 선택하기" onClick={handleNavigate} />
        </LogClickEvent>
      </div>
    </div>
  );
};

export default NoArtistSection;
