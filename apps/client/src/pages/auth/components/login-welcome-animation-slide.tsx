import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';

import { DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import loginLogoAnimation from '@shared/assets/lotties/login-logo-animtaion.json';
import { clearLottieAssetBasePath } from '@shared/utils/images';

import * as styles from '../page/login-page.css';

interface LoginWelcomeAnimationSlideProps {
  currentSlideIndex: number;
  onChangeSlide: (index: number) => void;
}

const LoginWelcomeAnimationSlide = ({
  currentSlideIndex,
  onChangeSlide,
}: LoginWelcomeAnimationSlideProps) => {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.closeButtonSection}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleCloseButtonClick}
          aria-label="닫기"
        >
          <Icon name="close" size="2rem" />
        </button>
      </div>
      <div className={styles.titleSection}>
        <div className={styles.title}>
          {'공연의 설렘부터 감동까지,\n콘페티와 함께해요!'}
        </div>
      </div>
      <div className={styles.lottieBody}>
        <div className={styles.lottieAnimation}>
          <Lottie
            loop
            play={currentSlideIndex === 0}
            animationData={clearLottieAssetBasePath(loginLogoAnimation)}
          />
        </div>
      </div>
      <div className={styles.indicatorSection}>
        <DotIndicator
          total={3}
          current={currentSlideIndex}
          onDotClick={onChangeSlide}
          tone="light"
        />
      </div>
    </div>
  );
};

export default LoginWelcomeAnimationSlide;
