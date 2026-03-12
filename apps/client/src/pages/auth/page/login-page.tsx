import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';

import { Button, DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import loginLogoAnimation from '@shared/assets/lotties/login-logo-animtaion.json';
import { ENV_CONFIG } from '@shared/constants/config';
import { clearLottieAssetBasePath } from '@shared/utils/images';

import { useSocialLoginMutation } from '../hooks/use-social-login-mutation';
import { LOGIN_SLIDES } from '../types/types';
import { getAppleAuthData, initAppleAuth } from '../utils/apple-login';

import * as styles from './login-page.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { scrollX } = useScroll({
    container: sliderRef,
  });
  const { mutate: appleLoginMutate } = useSocialLoginMutation();

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

  const handleAppleLogin = async () => {
    try {
      initAppleAuth();
      const loginData = await getAppleAuthData();
      appleLoginMutate(loginData);
    } catch (error) {
      console.error('애플 로그인 에러:', error);
    }
  };

  const handleKakaoLogin = () => {
    const REDIRECT_URI =
      window.location.hostname === 'localhost'
        ? ENV_CONFIG.KAKAO_LOCAL_REDIRECT_URI
        : ENV_CONFIG.KAKAO_REDIRECT_URI;

    window.location.href = `${ENV_CONFIG.KAKAO_URI}&redirect_uri=${REDIRECT_URI}`;
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.closeButtonSection}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="닫기"
            >
              <Icon name="close" size="2rem" />
            </button>
          </div>

          <h1 className={styles.title}>
            {LOGIN_SLIDES[currentSlideIndex]?.title}
          </h1>
        </header>

        <div className={styles.heroSection} ref={sliderRef}>
          {LOGIN_SLIDES.map((slide) => (
            <div key={slide.title} className={styles.heroSectionItem}>
              {slide.type === 'LOTTIE' ? (
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
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={styles.overlayImage}
                />
              )}
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
          <Button
            text="카카오로 계속하기"
            variant="kakao"
            icon={<Icon name="kakao" size="3rem" />}
            onClick={handleKakaoLogin}
            className={styles.button}
          />
          <Button
            text="Apple로 계속하기"
            variant="apple"
            icon={<Icon name="apple" size="3rem" />}
            onClick={handleAppleLogin}
            className={styles.button}
          />
        </div>

        <div className={styles.description}>
          <p>가입 시, confeti의</p>
          <p className={styles.policyLine}>
            <a
              href="https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9"
              className={styles.atagText}
              target="_blank"
              rel="noopener noreferrer"
            >
              이용약관
            </a>
            <span>및</span>
            <a
              href="https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a"
              className={styles.atagText}
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보처리방침
            </a>
            <span>에 동의하게돼요.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
