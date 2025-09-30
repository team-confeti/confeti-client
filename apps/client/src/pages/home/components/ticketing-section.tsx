import { TicketingCard } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { TicketingPerformances } from '@shared/types/home-response';

import * as styles from './ticketing-section.css';

const imageUrls = [
  '/images/img_dday01.svg',
  '/images/img_dday02.svg',
  '/images/img_dday03.svg',
  '/images/img_dday04.svg',
  '/images/img_dday05.svg',
];

const TicketingSection = ({
  data,
  ref,
}: {
  data: TicketingPerformances[];
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const navigateToDetail = useNavigateToDetail();

  const DdayList = data?.map((performance) => ({
    ...performance,
    reserveAt: formatDate(performance.reserveAt, 'Dday'),
  }));

  return (
    <section className={styles.ticketingBannerContainer} ref={ref}>
      <p className={styles.ticketingBannerText}>티켓 오픈</p>
      <div className={styles.ticketingCardContainer}>
        {data?.map((performance, index) => (
          <div key={performance.index} className={styles.ticketingCardWrapper}>
            <TicketingCard.Image
              imageUrl={imageUrls[index]}
              textContent={
                <>
                  <TicketingCard.Dday reserveAt={DdayList[index]?.reserveAt} />
                  <TicketingCard.SubTitle subtitle={performance.title} />
                </>
              }
              performanceInfoContent={
                <TicketingCard.PerformanceInfo
                  title={'티켓 정보 확인하기'}
                  typeId={performance.typeId}
                  performanceType={performance.type}
                  onClick={() =>
                    navigateToDetail(performance.type, performance.typeId)
                  }
                />
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TicketingSection;
