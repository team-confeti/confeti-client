import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';

import { Button, DotIndicator, toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';
import {
  isIOS,
  isNative,
  loginWithAppleNative,
  loginWithKakaoNative,
} from '@confeti/platform';
import { onError } from '@confeti/utils';

import { LogClickEvent, LogShowEvent } from '@shared/analytics/logging';
import loginLogoAnimation from '@shared/assets/lotties/login-logo-animtaion.json';
import SwitchCase from '@shared/components/switch-case';
import { ENV_CONFIG } from '@shared/constants/config';
import { clearLottieAssetBasePath } from '@shared/utils/images';

import { useSocialLoginMutation } from '../hooks/use-social-login-mutation';
import { LOGIN_SLIDES } from '../types/types';
import { getAppleAuthData, initAppleAuth } from '../utils/apple-login';

import * as styles from './login-page.css';

const resolveKakaoRedirectUri = () => {
  const isLocal =
    import.meta.env.DEV ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost');
  return isLocal
    ? ENV_CONFIG.KAKAO_LOCAL_REDIRECT_URI
    : ENV_CONFIG.KAKAO_REDIRECT_URI;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { scrollX } = useScroll({
    container: sliderRef,
  });
  const { mutateAsync: postSocialLogin } = useSocialLoginMutation();

  useMotionValueEvent(scrollX, 'change', (scrollLeft) => {
    const container = sliderRef.current;
    if (!container) return;

    const slideWidth = container.clientWidth;
    if (!slideWidth) return;

    const nextIndex = Math.round(scrollLeft / slideWidth);
    if (nextIndex < 0 || nextIndex >= LOGIN_SLIDES.length) return;

    setCurrentSlideIndex((prevIndex) =>
      prevIndex === nextIndex ? prevIndex : nextIndex,
    );
  });

  const handleSlideChange = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;
    if (index < 0 || index >= LOGIN_SLIDES.length) return;

    const slideWidth = container.clientWidth;
    if (!slideWidth) return;

    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    });
  };

  const handleAppleLogin = onError(() => {
    toast({
      text: '애플 로그인에 실패했어요.',
      position: 'middleCenter',
    });
  })(async () => {
    if (isIOS()) {
      const { code, name } = await loginWithAppleNative({
        clientId: ENV_CONFIG.APPLE_CLIENT_ID,
        webRedirectUri: ENV_CONFIG.APPLE_REDIRECT_URI,
      });
      await postSocialLogin({ provider: 'APPLE', code, name });
      return;
    }
    initAppleAuth();
    const loginData = await getAppleAuthData();
    await postSocialLogin(loginData);
  });

  const handleKakaoLogin = async () => {
    const redirectUri = resolveKakaoRedirectUri();
    try {
      if (isNative()) {
        const { code, redirectUrl } = await loginWithKakaoNative({
          authorizeUrl: ENV_CONFIG.KAKAO_URI,
          webRedirectUri: redirectUri,
        });
        await postSocialLogin({ provider: 'KAKAO', code, redirectUrl });
        return;
      }
      window.location.href = `${ENV_CONFIG.KAKAO_URI}&redirect_uri=${redirectUri}`;
    } catch {
      toast({
        text: '카카오 로그인에 실패했어요.',
        position: 'middleCenter',
      });
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <section className={styles.container}>
      <LogShowEvent name="show_login" />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.closeButtonSection}>
            <LogClickEvent name="click_login_close">
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="닫기"
              >
                <Icon name="close" size="2rem" />
              </button>
            </LogClickEvent>
          </div>

          <h1 className={styles.title}>
            {LOGIN_SLIDES[currentSlideIndex]?.title}
          </h1>
        </header>

        <div className={styles.heroSection} ref={sliderRef}>
          {LOGIN_SLIDES.map((slide) => (
            <div key={slide.title} className={styles.heroSectionItem}>
              <SwitchCase
                value={slide.type}
                caseBy={{
                  LOTTIE: () => (
                    <div className={styles.lottieBody}>
                      <div className={styles.lottieAnimation}>
                        <Lottie
                          loop
                          play={currentSlideIndex === 0}
                          animationData={clearLottieAssetBasePath(
                            loginLogoAnimation,
                          )}
                        />
                      </div>
                    </div>
                  ),
                  IMAGE: () => (
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className={styles.overlayImage}
                    />
                  ),
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.indicatorSection}>
          <DotIndicator
            total={LOGIN_SLIDES.length}
            current={currentSlideIndex}
            onDotClick={handleSlideChange}
            tone="light"
          />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.loginButton}>
          <LogClickEvent
            name="click_login_provider"
            params={{ provider: 'kakao' }}
          >
            <Button
              text="카카오로 계속하기"
              variant="kakao"
              icon={<Icon name="kakao" size="3rem" />}
              onClick={handleKakaoLogin}
              className={styles.button}
            />
          </LogClickEvent>
          <LogClickEvent
            name="click_login_provider"
            params={{ provider: 'apple' }}
          >
            <Button
              text="Apple로 계속하기"
              variant="apple"
              icon={<Icon name="apple" size="3rem" />}
              onClick={handleAppleLogin}
              className={styles.button}
            />
          </LogClickEvent>
        </div>

        <div className={styles.description}>
          <p>가입 시, confeti의</p>
          <p className={styles.policyLine}>
            <LogClickEvent
              name="click_login_policy_link"
              params={{ link_name: 'terms' }}
            >
              <a
                href="https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9"
                className={styles.atagText}
                target="_blank"
                rel="noopener noreferrer"
              >
                이용약관
              </a>
            </LogClickEvent>
            <span>및</span>
            <LogClickEvent
              name="click_login_policy_link"
              params={{ link_name: 'privacy' }}
            >
              <a
                href="https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a"
                className={styles.atagText}
                target="_blank"
                rel="noopener noreferrer"
              >
                개인정보처리방침
              </a>
            </LogClickEvent>
            <span>에 동의하게돼요.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
