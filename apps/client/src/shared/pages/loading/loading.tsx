import Lottie from 'react-lottie-player';

import loadingAnimation from '@shared/assets/lotties/confeti-logo-animation.json';
import { clearLottieAssetBasePath } from '@shared/utils/images';

import * as styles from './loading.css';

const Loading = () => {
  return (
    <div className={styles.loadingSection}>
      <Lottie
        loop
        animationData={clearLottieAssetBasePath(loadingAnimation)}
        play
        style={{ width: '15rem', height: '15rem' }}
      />
    </div>
  );
};

export default Loading;
