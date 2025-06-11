import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSocialLogin } from '@shared/apis/auth/auth-mutation';
import { routePath } from '@shared/router/path';
import { BaseResponse } from '@shared/types/api';
import {
  AppleLogin,
  KakaoLogin,
  SocialLoginResponse,
} from '@shared/types/login-response';
import { authTokenHandler } from '@shared/utils/token-handler';

type SocialLogin = KakaoLogin | AppleLogin;

export const useSocialLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, SocialLogin>({
    mutationFn: (socialLoginData) => postSocialLogin(socialLoginData),
    onSuccess: async (data) => {
      if (data?.data) {
        const { accessToken, refreshToken, isOnboarding } = data.data;
        authTokenHandler('set', accessToken, refreshToken);
        queryClient.clear();

        navigate(
          isOnboarding ? `${routePath.ONBOARDING}` : `${routePath.ROOT}`,
        );
      }
    },
  });
};
