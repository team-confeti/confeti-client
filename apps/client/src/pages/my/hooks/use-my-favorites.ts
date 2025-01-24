import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

export const useMyArtist = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.FAVORITE_ARTISTS(),
    enabled: !isNotLoggedIn,
  });
  return { data, isLoading: !data };
};

export const useMyConfeti = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES(),
    enabled: !isNotLoggedIn,
  });
  return { data, isLoading: !data };
};
