import Lottie from 'react-lottie-player';
import loadingAnimation from '@shared/assets/lotties/confeti-logo-animation.json';

const Loading = () => {
  const modifiedAnimationData = {
    ...loadingAnimation,
    assets: loadingAnimation.assets.map((asset) => ({
      ...asset,
      u: '',
    })),
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 5rem)',
      }}
    >
      <Lottie
        loop
        animationData={modifiedAnimationData}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default Loading;
