import { cn } from '../../../utils';
import { progressBarVariants } from './progress-bar.css';

interface Props {
  size: 'md' | 'lg' | 'sm';
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => (
  <div className={cn(progressBarVariants({ size: 'md' }))}>
    {current}/{total}
  </div>
);

export default ProgressBar;
