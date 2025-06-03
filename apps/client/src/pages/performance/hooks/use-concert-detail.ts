import { useSuspenseQuery } from '@tanstack/react-query';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';
import { Concert, ConcertArtist } from '@shared/types/concert-response';

interface UseConcertDetailReturn {
  concert: Concert;
  concertArtists: ConcertArtist[];
  isOpen: boolean;
}

export const useConcertDetail = (concertId: number): UseConcertDetailReturn => {
  const { data } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.CONCERT(concertId),
  );
  return {
    concert: data.concert,
    concertArtists: data.concertArtists,
    isOpen: data.isOpen,
  };
};
