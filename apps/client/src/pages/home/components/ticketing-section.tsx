import { TicketingCard } from '@confeti/design-system';
import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { formatDate } from '@shared/utils/format-date';

import { useTicketing } from '../hooks/use-ticketing';
import TicketingInfo from './ticketing-info';

import * as styles from './ticketing-section.css';

import ImgDday01 from '/images/img_dday01.svg';
import ImgDday02 from '/images/img_dday02.svg';
import ImgDday03 from '/images/img_dday03.svg';
import ImgDday04 from '/images/img_dday04.svg';
import ImgDday05 from '/images/img_dday05.svg';

const imageUrls = [ImgDday01, ImgDday02, ImgDday03, ImgDday04, ImgDday05];

const TicketingSection = () => {
  const { performances } = useTicketing();
  const navigateToDetail = useNavigateToDetail();

  const DdayList = performances?.map((performance) => ({
    ...performance,
    reserveAt: formatDate(performance.reserveAt, 'Dday'),
  }));

  console.log(performances);

  return (
    <section className={styles.ticketingBannerContainer}>
      <TicketingInfo />
      <div className={styles.ticketingCardContainer}>
        {performances?.map((performance, index) => (
          <TicketingCard.Image
            key={performance.index}
            imageUrl={imageUrls[index]}
            textContent={
              <>
                <TicketingCard.Dday reserveAt={DdayList[index]?.reserveAt} />
                <TicketingCard.SubTitle subtitle={performance.subtitle} />
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
