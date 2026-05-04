import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { LogShowEvent } from '@shared/analytics/logging';
import Loading from '@shared/pages/loading/loading';

import { useSocialLoginMutation } from '@pages/auth/hooks/use-social-login-mutation';

import { tryHandoffToNativeApp } from '../utils/native-redirect-bridge';

const KAKAO_NATIVE_SCHEME = 'com.confeti.app://auth';

const RedirectKakao = () => {
  const location = useLocation();
  const { mutate: kakaoLoginMutate } = useSocialLoginMutation();

  useEffect(function loginWithKakaoAuthorizationCode() {
    if (tryHandoffToNativeApp(location.search, KAKAO_NATIVE_SCHEME)) return;

    const code = new URLSearchParams(location.search).get('code');
    kakaoLoginMutate({
      provider: 'KAKAO',
      code: code ?? '',
      redirectUrl: `${window.location.origin}/auth`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LogShowEvent name="show_redirect_kakao" />
      <Loading />
    </>
  );
};

export default RedirectKakao;
