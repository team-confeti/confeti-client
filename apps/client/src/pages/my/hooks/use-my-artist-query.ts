import { useQuery } from '@tanstack/react-query';
import { FAVORITE_ARTIST_QUERY_OPTIONS } from '@shared/apis/my/my-queries';

export const useMyArtistQuery = () => {
  const { data } = useQuery(FAVORITE_ARTIST_QUERY_OPTIONS.GET());
  return { data };
};
