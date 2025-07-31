import { TicketingCard } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { TicketingPerformances } from '@shared/types/home-response';

import TicketingInfo from './ticketing-info';

import * as styles from './ticketing-section.css';

import ImgDday01 from '/images/img_dday01.svg';
import ImgDday02 from '/images/img_dday02.svg';
import ImgDday03 from '/images/img_dday03.svg';
import ImgDday04 from '/images/img_dday04.svg';
import ImgDday05 from '/images/img_dday05.svg';

const imageUrls = [ImgDday01, ImgDday02, ImgDday03, ImgDday04, ImgDday05];

const TicketingSection = ({
  data,
  userName,
  ref,
}: {
  data: TicketingPerformances[];
  userName: string | null;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const navigateToDetail = useNavigateToDetail();

  const DdayList = data?.map((performance) => ({
    ...performance,
    reserveAt: formatDate(performance.reserveAt, 'Dday'),
  }));

  return (
    <section className={styles.ticketingBannerContainer} ref={ref}>
      <TicketingInfo userName={userName} />
      <div className={styles.ticketingCardContainer}>
        {data?.map((performance, index) => (
          <TicketingCard.Image
            key={performance.index}
            imageUrl={imageUrls[index]}
            textContent={
              <>
                <TicketingCard.Dday reserveAt={DdayList[index]?.reserveAt} />
                <TicketingCard.SubTitle subtitle={performance.title} />
              </>
            }
            performanceInfoContent={
              <TicketingCard.PerformanceInfo
                title={'공연 정보 확인하기'}
                typeId={performance.typeId}
                performanceType={performance.type}
                onClick={() =>
                  navigateToDetail(performance.type, performance.typeId)
                }
              />
            }
          />
        ))}
      </div>
    </section>
  );
};

export default TicketingSection;
