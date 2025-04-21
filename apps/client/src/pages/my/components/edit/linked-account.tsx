import { IcApple, IcKakao } from '@confeti/design-system/icons';

import * as styles from './linked-account.css';

const LinkedAccount = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>연결된 계정</h3>
      <div className={styles.iconWrapper}>
        <IcKakao className={styles.kakaoIcon} />
        <IcApple className={styles.appleIcon} />
      </div>
    </section>
  );
};

export default LinkedAccount;
