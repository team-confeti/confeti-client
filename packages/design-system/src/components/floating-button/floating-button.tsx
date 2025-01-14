import { cn } from '../../utils';
import { floatingButtonVariants } from './floating-button.css';
import SvgIcArrowUpBlack30 from '../../icons/src/IcArrowUpBlack30';

const handleScrollToTop = () => {
  window.scrollTo({ top: 0 });
};

const FloatingButton = () => {
  return (
    <button
      className={cn(floatingButtonVariants())}
      onClick={handleScrollToTop}
    >
      <SvgIcArrowUpBlack30 width={'3rem'} height={'3rem'} />
    </button>
  );
};

export default FloatingButton;
