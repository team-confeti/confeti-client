import { BaseResponse, createInstance } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { ENV_CONFIG } from '@shared/constants/config';
import {
  type AppleLogin,
  type KakaoLogin,
  type SocialLoginResponse,
} from '@shared/types/social-login';

import { post as authorizedPost } from './config/instance';

const { post } = createInstance(ENV_CONFIG.BASE_URL);

export const postSocialLogin = async (
  socialLoginData: KakaoLogin | AppleLogin,
) => {
  return await post<BaseResponse<SocialLoginResponse>>(
    END_POINT.POST_SOCIAL_LOGIN,
    socialLoginData,
  );
};

export const postLogout = async () => {
  return await authorizedPost<BaseResponse<void>>(END_POINT.POST_LOGOUT);
};
