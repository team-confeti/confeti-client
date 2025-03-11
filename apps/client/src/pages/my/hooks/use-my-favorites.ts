import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';
import { useQuery } from '@tanstack/react-query';

export const useMyArtist = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.FAVORITE_ARTISTS(),
    enabled: !isNotLoggedIn,
  });
  // 로딩 상태 제거
  return { data };
};

export const useMyConfeti = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES(),
    enabled: !isNotLoggedIn,
  });
  // 로딩 상태 제거
  return { data };
};
