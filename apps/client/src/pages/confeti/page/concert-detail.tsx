import { useParams } from 'react-router-dom';
import Poster from '../components/poster';
import Summary from '../components/summary';

export default function ConcertDetailPage() {
  const { concertId } = useParams<{ concertId: string }>();

  //예시 데이터
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
  };

  return (
    <>
      <Poster
        posterBgUrl={concertData.posterBgUrl}
        posterUrl={concertData.posterUrl}
      />

      <Summary
        title={concertData.title}
        subtitle={concertData.subtitle}
        startAt={concertData.startAt}
        endAt={concertData.endAt}
        area={concertData.area}
        reserveAt={concertData.reserveAt}
        reservationUrl={concertData.reservationUrl}
      />
      <p>Concert ID: {concertId}</p>
    </>
  );
}
