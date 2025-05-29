import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocialLoginMutation } from '@pages/auth/hooks/use-social-login-mutation';

import Loading from '@shared/pages/loading/loading';

const RedirectKakao = () => {
  const location = useLocation();
  const { mutate: kakaoLoginMutate } = useSocialLoginMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const REDIRECT_URI = window.location.origin + '/auth';

    kakaoLoginMutate({
      provider: 'KAKAO',
      code: code ?? '',
      redirectUrl: REDIRECT_URI,
    });
  }, []);

  return <Loading />;
};

export default RedirectKakao;
