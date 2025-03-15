import { postSocialLogin } from '@shared/apis/login/login';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@shared/constants/path';
import { KakaoLogin, SocialLoginResponse } from '@shared/types/login-response';
import { BaseResponse } from '@shared/types/api';

export const useSocialLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<BaseResponse<SocialLoginResponse>, Error, KakaoLogin>({
    mutationFn: (socialLoginResponse) => postSocialLogin(socialLoginResponse),
    onSuccess: (data) => {
      if (data?.data) {
        const { accessToken, refreshToken, isOnboarding } = data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate(
          isOnboarding ? `${routePath.ONBOARDING}` : `${routePath.ROOT}`,
        );
      }
    },
  });
};
