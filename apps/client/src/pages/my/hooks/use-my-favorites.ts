import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { USER_ID_KEY } from '@shared/constants/user-constants';

export const useMyArtist = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.FAVORITE_ARTISTS(),
    enabled: !!userId,
  });
  return { data, isLoading: !data };
};

export const useMyConfeti = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES(),
    enabled: !!userId,
  });
  return { data, isLoading: !data };
};
