import { Icon } from '../../icons';
import { cn } from '../../utils';

import { floatingButtonVariants } from './floating-button.css';

interface FloatingButtonProps {
  isButtonHidden?: boolean;
  onClick: () => void;
}

const FloatingButton = ({ isButtonHidden, onClick }: FloatingButtonProps) => {
  return (
    <button
      className={cn(floatingButtonVariants({ isButtonHidden }))}
      onClick={onClick}
    >
      <Icon name="arrow-vertical" size="3rem" color="confeti_lime2" />
    </button>
  );
};

export default FloatingButton;
