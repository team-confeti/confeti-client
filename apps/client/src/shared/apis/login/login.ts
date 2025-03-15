import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { KakaoLogin, SocialLoginResponse } from '@shared/types/login-response';
import { axiosPublicInstance } from '../config/instance';

export const postSocialLogin = async (socialLoginResponse: KakaoLogin) => {
  const response = await axiosPublicInstance.post<
    BaseResponse<SocialLoginResponse>
  >(END_POINT.POST_SOCIAL_LOGIN, socialLoginResponse);
  return response.data;
};
