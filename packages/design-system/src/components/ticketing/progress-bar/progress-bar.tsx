import { cn } from '../../../utils';

import { progressBarVariants } from './progress-bar.css';

interface Props {
  size: 'md' | 'lg' | 'sm';
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(progressBarVariants({ size: 'md' }))}
      onClick={handleClick}
    >
      {current}/{total}
    </div>
  );
};

export default ProgressBar;
