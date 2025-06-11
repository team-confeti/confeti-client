import { Icon } from '../../icons';
import { cn } from '../../utils';

import { floatingButtonVariants } from './floating-button.css';

interface FloatingButtonProps {
  isButtonHidden?: boolean;
}

const handleScrollToTop = () => {
  window.scrollTo({ top: 0 });
};

const FloatingButton = ({ isButtonHidden }: FloatingButtonProps) => {
  return (
    <button
      className={cn(floatingButtonVariants({ isButtonHidden }))}
      onClick={handleScrollToTop}
    >
      <Icon name="arrow-vertical" size="3rem" color="confeti_lime2" />
    </button>
  );
};

export default FloatingButton;
