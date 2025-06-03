import axios from 'axios';

import { END_POINT } from '@shared/constants/api';
import { ENV_CONFIG } from '@shared/constants/config';
import { BaseResponse } from '@shared/types/api';
import {
  AppleLogin,
  KakaoLogin,
  SocialLoginResponse,
} from '@shared/types/login-response';

import { del, post } from '../config/instance';

const authInstance = axios.create({
  baseURL: ENV_CONFIG.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postSocialLogin = async (
  socialLoginData: KakaoLogin | AppleLogin,
): Promise<BaseResponse<SocialLoginResponse>> => {
  try {
    const response = await authInstance.post<BaseResponse<SocialLoginResponse>>(
      END_POINT.POST_SOCIAL_LOGIN,
      socialLoginData,
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      throw new Error(`Error: ${status} - ${data.message}`);
    }
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
