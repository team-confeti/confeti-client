import * as styles from './ticketing-info.css';

const TicketingInfo = ({ userName }: { userName: string | null }) => {
  return (
    <div>
      <div className={styles.ticketingBannerText}>
        {userName ? (
          <>
            <div>
              <span className={styles.highlightedText}>{userName}</span>님
            </div>
            <p>예매가 다가오고 있어요!</p>
          </>
        ) : (
          <>
            <p>공연의 시작과 끝을</p>
            <p>콘페티와 함께해보세요!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketingInfo;
