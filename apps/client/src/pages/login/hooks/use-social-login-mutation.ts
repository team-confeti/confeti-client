import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { postSocialLogin } from '@shared/apis/auth/auth';
import { routePath } from '@shared/constants/path';
import { BaseResponse } from '@shared/types/api';
import { KakaoLogin, SocialLoginResponse } from '@shared/types/login-response';
import { authTokenHandler } from '@shared/utils/token-handler';

export const useSocialLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, KakaoLogin>({
    mutationFn: (socialLoginResponse) => postSocialLogin(socialLoginResponse),
    onSuccess: (data) => {
      if (data?.data) {
        const { accessToken, refreshToken, isOnboarding } = data.data;
        authTokenHandler('set', accessToken, refreshToken);
        navigate(
          isOnboarding ? `${routePath.ONBOARDING}` : `${routePath.ROOT}`,
        );
      }
    },
  });
};
