import { FloatingButton } from '@confeti/design-system';

import { useScrollPosition } from '@shared/hooks/use-scroll-position';

const FloatingButtonContainer = () => {
  const { isButtonHidden } = useScrollPosition();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <FloatingButton
      isButtonHidden={isButtonHidden}
      onClick={handleScrollToTop}
    />
  );
};

export default FloatingButtonContainer;
