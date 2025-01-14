import { cn } from '../../../utils/cn';
import { progressBarVariants } from './progress-bar.css';

interface Props {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => (
  <div className={cn(progressBarVariants())}></div>
);

export default ProgressBar;
