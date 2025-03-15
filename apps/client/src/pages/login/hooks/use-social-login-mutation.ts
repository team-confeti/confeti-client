import { postSocialLogin } from '@shared/apis/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@shared/constants/path';
import { KakaoLogin, SocialLoginResponse } from '@shared/types/login-response';
import { BaseResponse } from '@shared/types/api';
import { cookieUtil } from '@shared/utils/use-cookie';

export const useSocialLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, KakaoLogin>({
    mutationFn: (socialLoginResponse) => postSocialLogin(socialLoginResponse),
    onSuccess: (data) => {
      if (data?.data) {
        const { accessToken, refreshToken, isOnboarding } = data.data;
        cookieUtil('set', accessToken, refreshToken);
        navigate(
          isOnboarding ? `${routePath.ONBOARDING}` : `${routePath.ROOT}`,
        );
      }
    },
  });
};
