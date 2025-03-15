import { postLogout } from '@shared/apis/\bauth/auth';
import { routePath } from '@shared/constants/path';
import { BaseResponse } from '@shared/types/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { localStorageUtil } from '@shared/utils/use-local-storage';

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation<BaseResponse<void>, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      localStorageUtil('remove');
      navigate(`${routePath.ROOT}`);
    },
  });
};
