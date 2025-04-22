import { useSuspenseQueries } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import {
  CarouselPerformancesResponse,
  SuggestMusicResponse,
  SuggestPerformanceResponse,
  TicketingPerformancesResponse,
} from '@shared/types/home-response';

const useHomeData = () => {
  const [
    ticketingResult,
    latestPerformancesResult,
    suggestPerformanceResult,
    suggestMusicResult,
  ] = useSuspenseQueries({
    queries: [
      HOME_QUERY_OPTIONS.TICKETING(),
      HOME_QUERY_OPTIONS.LATEST_PERFORMANCES(),
      HOME_QUERY_OPTIONS.SUGGEST_PERFORMANCE(),
      HOME_QUERY_OPTIONS.SUGGEST_MUSIC(),
    ],
  });

  const ticketing = ticketingResult.data as TicketingPerformancesResponse;
  const latestPerformances =
    latestPerformancesResult.data as CarouselPerformancesResponse;
  const suggestPerformance =
    suggestPerformanceResult.data as SuggestPerformanceResponse;
  const suggestMusic = suggestMusicResult.data as SuggestMusicResponse;

  return {
    ticketing,
    latestPerformances,
    suggestPerformance,
    suggestMusic,
  };
};

export default useHomeData;
