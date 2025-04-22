import { useUserProfile } from '@pages/my/hooks/use-user-info';

import * as styles from './ticketing-info.css';

const TicketingInfo = () => {
  const { data: profileData } = useUserProfile();

  return (
    <div>
      <p className={styles.ticketingBannerText}>
        {profileData ? (
          <>
            <span className={styles.highlightedText}>{profileData.name}</span>
            님 <br />
            예매가 다가오고 있어요!
          </>
        ) : (
          <>
            공연의 시작과 끝을 <br /> 콘페티와 함께해보세요!
          </>
        )}
      </p>
    </div>
  );
};

export default TicketingInfo;
