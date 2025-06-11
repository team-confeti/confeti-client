import { Icon } from '@confeti/design-system/icon';
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
        <div
          className={styles.logoBox({
            provider: provider === 'KAKAO' ? 'kakao' : 'kakaoDisabled',
          })}
        >
          <Icon
            name="kakao"
            size="3.5rem"
            color={provider === 'KAKAO' ? 'gray900' : 'gray300'}
          />
        </div>
        <div
          className={styles.logoBox({
            provider: provider === 'APPLE' ? 'apple' : 'appleDisabled',
          })}
        >
          <Icon
            name="apple"
            size="3.5rem"
            color={provider === 'APPLE' ? 'gray100' : 'gray300'}
          />
        </div>
      </div>
    </section>
  );
};

export default LinkedAccount;
