import { cn } from '../../../utils/cn';
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
