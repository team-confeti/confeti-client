import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authTokenHandler } from '@confeti/core/auth';
import { BaseResponse } from '@confeti/core/http';

import { AUTH_MUTATION_OPTIONS } from '@shared/apis/auth/auth-mutations';
import { routePath } from '@shared/router/path';
import {
  AppleLogin,
  KakaoLogin,
  SocialLoginResponse,
} from '@shared/types/login-response';

type SocialLogin = KakaoLogin | AppleLogin;

export const useSocialLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, SocialLogin>({
    ...AUTH_MUTATION_OPTIONS.POST_SOCIAL_LOGIN(),
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
