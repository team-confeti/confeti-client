import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { authTokenHandler, getAccessToken } from '@confeti/core/auth';

import { postSocialLogin } from '@shared/apis/auth';
import { Button } from '@shared/components/common';
import ConfetiLogo from '@shared/components/layout/confeti-logo';
import { ENV_CONFIG } from '@shared/constants/config';
import { PATH } from '@shared/constants/path';
import { type AppleLogin } from '@shared/types/social-login';
import {
  getRedirectPathFromSearchParams,
  persistRedirectPath,
} from '@shared/utils/admin-login-redirect';
import { adminToast } from '@shared/utils/admin-toast';

import { getAppleAuthData, initAppleAuth } from './apple-login';

import * as styles from './login-page.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const redirectPath = getRedirectPathFromSearchParams(searchParams);

  const accessToken = getAccessToken();

  const { mutateAsync: login, isPending: isSocialLoginPending } = useMutation({
    mutationFn: postSocialLogin,
    onSuccess: ({ data }) => {
      const { accessToken: nextAccessToken, refreshToken } = data;

      authTokenHandler('set', nextAccessToken, refreshToken);
      queryClient.clear();
      navigate(redirectPath, { replace: true });
    },
    onError: () => {
      adminToast.error({
        text: '로그인에 실패했어요. 권한이 있는 계정인지 확인해 주세요.',
      });
    },
  });

  if (accessToken) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleKakaoLogin = () => {
    persistRedirectPath(redirectPath);

    const redirectURI = `${window.location.origin}${PATH.REDIRECT_KAKAO}`;

    window.location.href = `${ENV_CONFIG.KAKAO_URI}&redirect_uri=${encodeURIComponent(redirectURI)}`;
  };

  const handleAppleLogin = async () => {
    if (!window.AppleID) {
      adminToast.error({
        text: '애플 로그인 준비에 실패했어요. 잠시 후 다시 시도해 주세요.',
      });
      return;
    }

    let appleAuthData: AppleLogin;

    try {
      initAppleAuth();
      appleAuthData = await getAppleAuthData();
    } catch (error) {
      if (error instanceof Error) {
        adminToast.error({
          text: error.message,
        });
      }

      return;
    }

    persistRedirectPath(redirectPath);
    await login(appleAuthData);
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <header className={styles.header}>
          <Button
            type="button"
            variant="ghost"
            size="small"
            leftIcon={<ChevronLeft size={18} />}
            onClick={handleBack}
            className={styles.backButton}
          >
            돌아가기
          </Button>
          <div className={styles.logo}>
            <ConfetiLogo />
          </div>
          <div>
            <h1 className={styles.title}>어드민 로그인이 필요해요.</h1>
            <p className={styles.description}>
              팀원으로 등록된 소셜 계정으로 로그인하면 바로 관리자 화면으로
              돌아와요.
            </p>
          </div>
        </header>

        <div className={styles.buttonGroup}>
          <Button
            type="button"
            size="large"
            onClick={handleKakaoLogin}
            disabled={isSocialLoginPending}
            leftIcon={
              <span className={`${styles.providerIcon} ${styles.kakaoIcon}`}>
                K
              </span>
            }
            rightIcon={<ArrowRight size={18} />}
            className={`${styles.providerButton} ${styles.kakaoButton}`}
          >
            카카오로 로그인하기
          </Button>
          <Button
            type="button"
            size="large"
            onClick={handleAppleLogin}
            disabled={isSocialLoginPending}
            leftIcon={
              <span className={`${styles.providerIcon} ${styles.appleIcon}`}>
                A
              </span>
            }
            rightIcon={<ArrowRight size={18} />}
            className={`${styles.providerButton} ${styles.appleButton}`}
          >
            Apple로 로그인하기
          </Button>
        </div>

        <p className={styles.helperText}>
          일반 사용자 계정으로 로그인하면 관리자 권한이 없을 수 있어요.
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
