import { FloatingButton } from '@confeti/design-system';

import { LogClickEvent } from '@shared/analytics/logging';
import { useScrollPosition } from '@shared/hooks/use-scroll-position';

const FloatingButtonContainer = () => {
  const { isButtonHidden } = useScrollPosition();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <LogClickEvent name="click_scroll_to_top">
      <FloatingButton
        isButtonHidden={isButtonHidden}
        onClick={handleScrollToTop}
      />
    </LogClickEvent>
  );
};

export default FloatingButtonContainer;
