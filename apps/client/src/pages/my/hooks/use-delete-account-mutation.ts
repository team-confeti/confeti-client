import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authTokenHandler } from '@confeti/core/auth';

import { deleteAccount } from '@shared/apis/auth/auth-mutation';
import { routePath } from '@shared/router/path';

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
