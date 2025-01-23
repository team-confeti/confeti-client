import { useSuspenseQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';

export const useMyArtist = () => {
  const { data } = useSuspenseQuery(USER_QUERY_OPTIONS.FAVORITE_ARTISTS());
  return { data };
};

export const useMyConfeti = () => {
  const { data } = useSuspenseQuery(USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES());
  return { data };
};
