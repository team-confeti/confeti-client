import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { LogShowEvent } from '@shared/analytics/logging';
import Loading from '@shared/pages/loading/loading';

import { useSocialLoginMutation } from '@pages/auth/hooks/use-social-login-mutation';

const RedirectKakao = () => {
  const location = useLocation();
  const { mutate: kakaoLoginMutate } = useSocialLoginMutation();

  useEffect(function loginWithKakaoAuthorizationCode() {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const REDIRECT_URI = window.location.origin + '/auth';

    kakaoLoginMutate({
      provider: 'KAKAO',
      code: code ?? '',
      redirectUrl: REDIRECT_URI,
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
