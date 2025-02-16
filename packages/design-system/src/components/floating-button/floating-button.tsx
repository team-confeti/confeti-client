import { cn } from '../../utils';
import { floatingButtonVariants } from './floating-button.css';
import SvgIcArrowUpBlack30 from '../../icons/src/IcArrowUpBlack30';

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
      <SvgIcArrowUpBlack30 width={'3rem'} height={'3rem'} />
    </button>
  );
};

export default FloatingButton;
