import { useSuspenseQuery } from '@tanstack/react-query';
import { MY_ARTIST_QUERY_OPTIONS } from '@shared/apis/my/my-queries';

export const useMyArtistQuery = () => {
  const { data } = useSuspenseQuery(MY_ARTIST_QUERY_OPTIONS.GET());
  return { data };
};
