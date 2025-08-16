import {
  authTokenHandler,
  getRefreshToken,
  TokenResponse,
} from '@confeti/core/auth';
import { createInstance } from '@confeti/core/http';
import { BaseResponse, HTTP_STATUS_CODE, HTTPError } from '@confeti/core/http';

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

export const postReissueToken = async (): Promise<
  BaseResponse<TokenResponse>
> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error('리프레시 토큰이 없습니다.');
    throw new HTTPError(
      HTTP_STATUS_CODE.UNAUTHORIZED,
      '리프레시 토큰이 없습니다. 다시 로그인해주세요.',
    );
  }

  try {
    const response = await fetch(
      `${ENV_CONFIG.BASE_URL}${END_POINT.POST_REISSUE_TOKEN}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('토큰 재발급 실패 응답:', errorText);
      throw new HTTPError(
        response.status,
        `토큰 재발급에 실패했습니다: ${errorText}`,
      );
    }

    const result: BaseResponse<TokenResponse> = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = result.data;

    authTokenHandler('set', accessToken, newRefreshToken);

    return result;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }
    throw new HTTPError(
      HTTP_STATUS_CODE.UNAUTHORIZED,
      '토큰 재발급에 실패했습니다.',
    );
  }
};
