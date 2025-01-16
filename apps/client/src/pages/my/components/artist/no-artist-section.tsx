import { Button } from '@confeti/design-system';
import * as styles from './no-artist-section.css';

const NoArtistSection = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        {`관심있는 아티스트가 궁금해요! \n
                아티스트를 선택하러 가볼까요?`}
      </p>

      <div className={styles.button}>
        <Button text="아티스트 선택하기" />
      </div>
    </div>
  );
};

export default NoArtistSection;
