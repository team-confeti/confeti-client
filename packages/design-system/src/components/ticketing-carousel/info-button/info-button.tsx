import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils';
import { infoButtonVariants } from './info-button.css';
import SvgIcArrowWhite12 from '../../../icons/src/IcArrowWhite12';

interface InfoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  typeId?: number;
  performanceType?: string;
}

const InfoButton = ({
  className,
  title,
  size = 'md',
  typeId,
  performanceType,
}: InfoButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${performanceType}-detail/${typeId}`);
  };
  return (
    <button
      className={cn(infoButtonVariants({ size: size }), className)}
      onClick={handleClick}
    >
      {title}
      <SvgIcArrowWhite12 width={'1.2rem'} height={'1.2rem'} />
    </button>
  );
};

export default InfoButton;
