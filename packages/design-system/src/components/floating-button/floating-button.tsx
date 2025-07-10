import { cn } from '@confeti/utils';

import { Icon } from '../../icons';

import { floatingButtonVariants } from './floating-button.css';

interface Props {
  isButtonHidden?: boolean;
  onClick: () => void;
}

const FloatingButton = ({ isButtonHidden, onClick }: Props) => {
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
