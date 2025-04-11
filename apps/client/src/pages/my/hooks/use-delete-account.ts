import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAccount } from '@shared/apis/auth/auth';
import { USER_QUERY_KEY } from '@shared/apis/user/user-queries';
import { routePath } from '@shared/constants/path';
import { authTokenHandler } from '@shared/utils/token-handler';

export const useDeleteAccountMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();

      authTokenHandler('remove');
      navigate(`${routePath.LOGIN}`);
    },
  });
};
