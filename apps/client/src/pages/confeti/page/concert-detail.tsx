import { useParams } from 'react-router-dom';
import Poster from '../components/poster';

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
  };

  return (
    <>
      <Poster
        posterBgUrl={concertData.posterBgUrl}
        posterUrl={concertData.posterUrl}
      />

      <div>
        <div>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
      <h1>Concert Detail</h1>
      <p>Concert ID: {concertId}</p>
    </>
  );
}
