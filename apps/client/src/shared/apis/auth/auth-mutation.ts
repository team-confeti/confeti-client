import { createInstance } from '@confeti/core/http';
import { BaseResponse } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { ENV_CONFIG } from '@shared/constants/config';
import {
  AppleLogin,
  KakaoLogin,
  SocialLoginResponse,
} from '@shared/types/login-response';

import { del, post } from '../config/instance';

const { post: authPost } = createInstance(ENV_CONFIG.BASE_URL);

export const postSocialLogin = async (
  socialLoginData: KakaoLogin | AppleLogin,
): Promise<BaseResponse<SocialLoginResponse>> => {
  try {
    const response = await authPost<BaseResponse<SocialLoginResponse>>(
      END_POINT.POST_SOCIAL_LOGIN,
      socialLoginData,
    );

    return response;
  } catch {
    throw new Error('Unexpected error occurred');
  }
};

export const postLogout = async (): Promise<BaseResponse<void>> => {
  const response = await post<BaseResponse<void>>(END_POINT.POST_LOGOUT);
  return response;
};

export const deleteAccount = async () => {
  const response = await del(END_POINT.DELETE_ACCOUNT);
  return response;
};
