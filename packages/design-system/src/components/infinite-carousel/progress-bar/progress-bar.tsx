import { cn } from '../../../utils';
import { progressBarVariants } from './progress-bar.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ProgressBar = ({ className, children, ...props }: Props) => (
  <div className={cn(progressBarVariants(), className)} {...props}>
    {children}
  </div>
);

export default ProgressBar;
