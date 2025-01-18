import Poster from '../components/poster';
import Summary from '../components/summary';
import Info from '../components/info';
import PerformanceDetail from '../components/performance-detail';
import * as styles from '@pages/confeti/page/concert-detail.css';

export default function FestivalDetailPage() {
  const festivalData = {
    posterBgUrl: 'https://placehold.co/375x280',
    posterUrl: 'https://picsum.photos/180/240',
    title: '터치드(TOUCHED) 단독 콘서트',
    subtitle: 'HIGHLIGHT Ⅲ',
    startAt: '2025.01.25',
    endAt: '2025.01.26',
    area: '올림픽공원 올림픽홀',
    reserveAt: '2025-01-20T14:00:00',
    reservationUrl:
      'https://tickets.interpark.com/goods/24016171?app_tapbar_state=hide',
    time: '120분',
    ageRating: '14세 이상 관람가',
    reservationOffice: '인터파크',
    price: '스탠딩석 132,000원\n지정석 R석 132,000원\n지정석 S석 132,000원',
  };

  return (
    <>
      <Poster
        posterBgUrl={festivalData.posterBgUrl}
        posterUrl={festivalData.posterUrl}
      />
      <div className={styles.container}>
        <Summary
          title={festivalData.title}
          subtitle={festivalData.subtitle}
          startAt={festivalData.startAt}
          endAt={festivalData.endAt}
          area={festivalData.area}
          reserveAt={festivalData.reserveAt}
          reservationUrl={festivalData.reservationUrl}
        />
        <Info
          subtitle={festivalData.subtitle}
          area={festivalData.area}
          startAt={festivalData.startAt}
          endAt={festivalData.endAt}
          time={festivalData.time}
          ageRating={festivalData.ageRating}
          reservationOffice={festivalData.reservationOffice}
          price={festivalData.price}
        />
        <PerformanceDetail />
      </div>
    </>
  );
}
