import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '@shared/pages/loading/loading';

import { useSocialLoginMutation } from '@pages/auth/hooks/use-social-login-mutation';

import { getKakaoCallbackRedirectUri } from '../utils/kakao-redirect-uri';

const RedirectKakao = () => {
  const location = useLocation();
  const { mutate: kakaoLoginMutate } = useSocialLoginMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if (!code) return;

    kakaoLoginMutate({
      provider: 'KAKAO',
      code,
      redirectUrl: getKakaoCallbackRedirectUri(),
    });
  }, [location.search, kakaoLoginMutate]);

  return <Loading />;
};

export default RedirectKakao;
