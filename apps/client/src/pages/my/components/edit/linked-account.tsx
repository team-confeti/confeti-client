import {
  BtnAppleActive,
  BtnAppleDisabled,
  BtnKakaoActive,
  BtnKakaoDisabled,
} from '@confeti/design-system/icons';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';

import * as styles from './linked-account.css';

const LinkedAccount = () => {
  const { data: profileData } = useUserProfile();
  if (!profileData) return null;

  const provider = profileData.provider;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>연결된 계정</h3>
      <div className={styles.iconWrapper}>
        {provider === 'KAKAO' ? (
          <BtnKakaoActive className={styles.icon} />
        ) : (
          <BtnKakaoDisabled className={styles.icon} />
        )}
        {provider === 'APPLE' ? (
          <BtnAppleActive className={styles.icon} />
        ) : (
          <BtnAppleDisabled className={styles.icon} />
        )}
      </div>
    </section>
  );
};

export default LinkedAccount;
