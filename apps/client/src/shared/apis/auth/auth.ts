import { CONFIG, END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  AppleLogin,
  KakaoLogin,
  SocialLoginResponse,
} from '@shared/types/login-response';

import { del, post } from '../config/instance';

export const postSocialLogin = async (
  socialLoginData: KakaoLogin | AppleLogin,
): Promise<BaseResponse<SocialLoginResponse>> => {
  console.log(socialLoginData);

  const response = await fetch(
    `${CONFIG.BASE_URL}${END_POINT.POST_SOCIAL_LOGIN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(socialLoginData),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error: ${response.status} - ${error.message}`);
  }

  const data = await response.json();
  return data;
};

export const postLogout = async (): Promise<BaseResponse<void>> => {
  const response = await post<BaseResponse<void>>(END_POINT.POST_LOGOUT);
  return response;
};

export const deleteAccount = async () => {
  const response = await del(END_POINT.DELETE_ACCOUNT);
  return response;
};
