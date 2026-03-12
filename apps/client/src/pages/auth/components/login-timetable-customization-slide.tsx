import { useNavigate } from 'react-router-dom';

import { DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from '../page/login-page.css';

interface LoginTimetableCustomizationSlideProps {
  currentSlideIndex: number;
  onChangeSlide: (index: number) => void;
}

const LoginTimetableCustomizationSlide = ({
  currentSlideIndex,
  onChangeSlide,
}: LoginTimetableCustomizationSlideProps) => {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.heroSection}>
      <img
        src="/images/img_login_3.webp"
        alt="타임테이블을 소개하는 로그인 이미지"
        className={`${styles.overlayImage} ${styles.loginThreeImage}`}
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
          {'나만의 공연 관람 계획을 세우고,\n타임테이블을 커스텀해요'}
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

export default LoginTimetableCustomizationSlide;
