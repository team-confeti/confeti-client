import { Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { DetailHeader } from '@shared/components';
import { EXTERNAL_LINKS } from '@shared/constants/links';

import * as styles from './no-upcoming-festival.css';

const NoUpcomingFestival = () => {
  const googleFormLink = EXTERNAL_LINKS.find(
    (link) => link.label === '희망 페스티벌 폼',
  )?.url;

  return (
    <>
      <DetailHeader title="페스티벌 추가하기" />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Icon name="warning" size="6rem" color="gray200" />
          <div className={styles.textWrapper}>
            <p className={styles.mainText}>앗! 페스티벌이 존재하지 않아요</p>
            <p className={styles.subText}>
              추가적으로 진행되는 페스티벌이 없어요.
            </p>
          </div>
        </div>
        <a
          href={googleFormLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.buttonText}
        >
          원하는 페스티벌이 있나요?
        </a>
      </div>
      <div className={styles.buttonSection}>
        <Button variant="add" text={'추가하기'} disabled={true} />
      </div>
    </>
  );
};

export default NoUpcomingFestival;
