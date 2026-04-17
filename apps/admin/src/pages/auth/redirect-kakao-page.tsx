import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authTokenHandler } from '@confeti/core/auth';

import { postSocialLogin } from '@shared/apis/auth';
import Loading from '@shared/components/loading/loading';
import { getLoginPath, PATH } from '@shared/constants/path';
import {
  consumeRedirectPath,
  getPersistedRedirectPath,
} from '@shared/utils/admin-login-redirect';
import { adminToast } from '@shared/utils/admin-toast';

const RedirectKakaoPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postSocialLogin,
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      authTokenHandler('set', accessToken, refreshToken);
      queryClient.clear();
      navigate(consumeRedirectPath(), { replace: true });
    },
    onError: () => {
      adminToast.error({
        text: '카카오 로그인에 실패했어요. 다시 시도해 주세요.',
      });
      navigate(getLoginPath(getPersistedRedirectPath()), { replace: true });
    },
  });

  useEffect(
    function loginWithKakaoAuthorizationCode() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (!code) {
        adminToast.error({
          text: '카카오 로그인 응답을 확인할 수 없어요. 다시 시도해 주세요.',
        });
        navigate(getLoginPath(getPersistedRedirectPath()), { replace: true });
        return;
      }

      mutate({
        provider: 'KAKAO',
        code,
        redirectUrl: `${window.location.origin}${PATH.REDIRECT_KAKAO}`,
      });
    },
    [mutate, navigate],
  );

  return <Loading />;
};

export default RedirectKakaoPage;
