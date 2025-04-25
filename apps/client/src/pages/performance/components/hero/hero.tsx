import { IcArrowLeftWhite20 } from '@confeti/design-system/icons';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './hero.css';

interface HeroProps {
  posterBgUrl: string;
  posterUrl: string;
  title: string;
  startAt: string;
  onClickBack?: () => void;
}

const Hero = ({
  posterBgUrl,
  posterUrl,
  title,
  startAt,
  onClickBack,
}: HeroProps) => {
  const year = formatDate(startAt, 'koHalf').split('년')[0];

  return (
    <div className={styles.wrapper}>
      <img src={posterBgUrl} className={styles.background} alt="배경 포스터" />
      <div className={styles.backgroundOverlay} />
      <button className={styles.backButton} onClick={onClickBack}>
        <IcArrowLeftWhite20 width="2rem" height="2rem" />
      </button>
      <div className={styles.textWrapper}>
        <p className={styles.year}>{year}</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <img src={posterUrl} className={styles.poster} alt="포스터" />
    </div>
  );
};

export default Hero;
