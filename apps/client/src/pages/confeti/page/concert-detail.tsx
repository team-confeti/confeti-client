import Info from '../components/info';
import Poster from '../components/poster';
import Summary from '../components/summary';
import * as styles from '@pages/confeti/page/concert-detail.css';

export default function ConcertDetailPage() {
  const concertData = {
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
        posterBgUrl={concertData.posterBgUrl}
        posterUrl={concertData.posterUrl}
      />
      <div className={styles.container}>
        <Summary
          title={concertData.title}
          subtitle={concertData.subtitle}
          startAt={concertData.startAt}
          endAt={concertData.endAt}
          area={concertData.area}
          reserveAt={concertData.reserveAt}
          reservationUrl={concertData.reservationUrl}
        />

        <Info
          subtitle={concertData.subtitle}
          area={concertData.area}
          startAt={concertData.startAt}
          endAt={concertData.endAt}
          time={concertData.time}
          ageRating={concertData.ageRating}
          reservationOffice={concertData.reservationOffice}
          price={concertData.price}
        />
      </div>
    </>
  );
}
