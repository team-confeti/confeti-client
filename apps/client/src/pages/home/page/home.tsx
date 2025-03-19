import { useNavigate } from 'react-router-dom';
import {
  Footer,
  PerformanceCarousel,
  Navigation,
  TicketingCard,
} from '@confeti/design-system';
import { USER_DATA } from '@shared/mocks/user-data';
import { USER_ID_KEY } from '@shared/constants/user-constants';
import { routePath } from '@shared/constants/path';
import { useUserProfile } from '@pages/my/hooks/use-user-info';
import { TAB_MENU } from '../constants/menu';
import { useTicketing } from '../hooks/use-ticketing';
import { useLatestPerformances } from '../hooks/use-latest-performances';
import * as styles from './home.css';
import ImgDday01 from '/images/img_dday01.svg';
import ImgDday02 from '/images/img_dday02.svg';
import ImgDday03 from '/images/img_dday03.svg';
import ImgDday04 from '/images/img_dday04.svg';
import ImgDday05 from '/images/img_dday05.svg';
import { formatDate } from '@shared/utils/use-format-date';

const Home = () => {
  const { performances } = useTicketing();
  const { latestPerformances } = useLatestPerformances();
  const userId = localStorage.getItem(USER_ID_KEY);
  const { data: profileData } = useUserProfile();
  const isHighlighted = profileData && Number(userId) === USER_DATA.data.userId;
  const navigate = useNavigate();
  const handleGoHome = () => navigate(routePath.ROOT);
  const handleGoToTimeTable = () => navigate(routePath.TIME_TABLE_OUTLET);
  const imageUrls = [ImgDday01, ImgDday02, ImgDday03, ImgDday04, ImgDday05];

  return (
    <>
      <Navigation.Root defaultActiveTab={0}>
        <Navigation.List>
          <Navigation.Item index={0} handleTabClick={handleGoHome}>
            {TAB_MENU.HOME}
          </Navigation.Item>
          <Navigation.Item index={1} handleTabClick={handleGoToTimeTable}>
            {TAB_MENU.TIMETABLE}
          </Navigation.Item>
        </Navigation.List>

        <div className={styles.background}>
          <section className={styles.performanceBannerContainer}>
            <PerformanceCarousel performData={latestPerformances} />
          </section>
          <section className={styles.ticketingBannerContainer}>
            <p className={styles.ticketingBannerText}>
              {isHighlighted ? (
                <>
                  <span className={styles.highlightedText}>
                    {profileData.username}
                  </span>
                  님 <br />
                  예매가 다가오고 있어요!
                </>
              ) : (
                <>
                  공연의 시작과 끝을 <br /> 콘페티와 함께해보세요!
                </>
              )}
            </p>
            {performances?.map((performance, index) => (
              <TicketingCard.Image
                key={performance.typeId}
                imageUrl={imageUrls[index]}
              >
                <TicketingCard.Dday
                  reserveAt={formatDate(performance.reserveAt, 'Dday')}
                />
                <TicketingCard.SubTitle subtitle={performance.subtitle} />
                <TicketingCard.PerformanceInfo
                  title={'공연 정보 확인하기'}
                  typeId={performance.typeId}
                  performanceType={performance.type}
                />
              </TicketingCard.Image>
            ))}
          </section>
        </div>
      </Navigation.Root>
      <Footer />
    </>
  );
};

export default Home;
