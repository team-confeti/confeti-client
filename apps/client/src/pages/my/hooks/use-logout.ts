import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogout } from '@shared/apis/auth/auth';
import { USER_QUERY_KEY } from '@shared/apis/user/user-queries';
import { routePath } from '@shared/constants/path';
import { BaseResponse } from '@shared/types/api';
import { tokenUtil } from '@shared/utils/token-handler';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<void>, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...USER_QUERY_KEY.PROFILE()],
      });
      tokenUtil('remove');
      navigate(`${routePath.ROOT}`);
    },
  });
};
