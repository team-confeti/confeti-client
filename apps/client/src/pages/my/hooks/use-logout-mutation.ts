import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogout } from '@shared/apis/auth/auth-mutation';
import { routePath } from '@shared/router/path';
import { BaseResponse } from '@shared/types/api';
import { authTokenHandler } from '@shared/utils/token-handler';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<void>, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.clear();
      authTokenHandler('remove');
      navigate(`${routePath.ROOT}`);
    },
  });
};
