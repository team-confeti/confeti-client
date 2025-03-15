import { postLogout } from '@shared/apis/\bauth/auth';
import { routePath } from '@shared/constants/path';
import { BaseResponse } from '@shared/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { USER_QUERY_KEY } from '@shared/apis/user/user-queries';
import { cookieUtil } from '@shared/utils/use-cookie';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<void>, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...USER_QUERY_KEY.PROFILE()],
      });
      cookieUtil('remove');
      navigate(`${routePath.ROOT}`);
    },
  });
};
