import * as styles from './ticketing-info.css';

const TicketingInfo = ({ userName }: { userName: string | null }) => {
  return (
    <div>
      <p className={styles.ticketingBannerText}>
        {userName ? (
          <>
            <span className={styles.highlightedText}>{userName}</span>
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
