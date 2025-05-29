import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { postSocialLogin } from '@shared/apis/auth/auth';
import { routePath } from '@shared/router/path';
import { BaseResponse } from '@shared/types/api';
import {
  AppleLogin,
  KakaoLogin,
  SocialLoginResponse,
} from '@shared/types/login-response';
import { authTokenHandler } from '@shared/utils/token-handler';

export const useSocialLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, KakaoLogin>({
    mutationFn: (socialLoginData) => postSocialLogin(socialLoginData),
    onSuccess: (data) => {
      if (data?.data) {
        const { accessToken, refreshToken, isOnboarding } = data.data;
        authTokenHandler('set', accessToken, refreshToken);
        navigate(
          isOnboarding ? `${routePath.ONBOARDING}` : `${routePath.ROOT}`,
        );
      }
      // TODO: 토큰 발급 후 새로고침 필요
      window.location.reload();
    },
  });
};

export const useAppleLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, AppleLogin>({
    mutationFn: (socialLoginData) => postSocialLogin(socialLoginData),
    onSuccess: (data) => {
      if (data?.data) {
        const { accessToken, refreshToken, isOnboarding } = data.data;
        authTokenHandler('set', accessToken, refreshToken);
        navigate(
          isOnboarding ? `${routePath.ONBOARDING}` : `${routePath.ROOT}`,
        );
      }
      // TODO: 토큰 발급 후 새로고침 필요
      window.location.reload();
    },
  });
};
