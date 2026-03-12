import { useNavigate } from 'react-router-dom';

import { DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from '../page/login-page.css';

interface LoginPerformanceOverviewSlideProps {
  currentSlideIndex: number;
  onChangeSlide: (index: number) => void;
}

const LoginPerformanceOverviewSlide = ({
  currentSlideIndex,
  onChangeSlide,
}: LoginPerformanceOverviewSlideProps) => {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.heroSection}>
      <img
        src="/images/img_login_2.webp"
        alt="공연 정보를 소개하는 로그인 이미지"
        className={`${styles.overlayImage} ${styles.loginTwoImage}`}
      />
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
          {'콘서트, 페스티벌 등\n나에게 맞는 공연 정보를 확인해요'}
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

export default LoginPerformanceOverviewSlide;
