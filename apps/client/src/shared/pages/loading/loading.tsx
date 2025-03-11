import loadingAnimation from '@shared/assets/lotties/confeti-logo-animation.json';
import Lottie from 'react-lottie-player';

import * as styles from './loading.css';

const Loading = () => {
  const modifiedAnimationData = {
    ...loadingAnimation,
    assets: loadingAnimation.assets.map((asset) => ({
      ...asset,
      u: '',
    })),
  };

  return (
    <div className={styles.loadingSection}>
      <Lottie
        loop
        animationData={modifiedAnimationData}
        play
        style={{ width: 390, height: 390 }}
      />
    </div>
  );
};

export default Loading;
