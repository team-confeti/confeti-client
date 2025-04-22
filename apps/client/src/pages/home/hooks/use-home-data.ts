import { useSuspenseQueries } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';

const useHomeData = () => {
  const results = useSuspenseQueries({
    queries: [
      HOME_QUERY_OPTIONS.TICKETING(),
      HOME_QUERY_OPTIONS.LATEST_PERFORMANCES(),
      HOME_QUERY_OPTIONS.SUGGEST_PERFORMANCE(),
      HOME_QUERY_OPTIONS.SUGGEST_MUSIC(),
    ],
  });

  const [ticketing, latestPerformances, suggestPerformance, suggestMusic] =
    results.map((result) => result.data);

  return {
    ticketing,
    latestPerformances,
    suggestPerformance,
    suggestMusic,
  };
};

export default useHomeData;
