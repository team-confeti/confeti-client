import { cn } from '../../utils';

import { dialogVariants } from './dialog.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Dialog = ({ className, children, ...props }: Props) => (
  <div className={cn(dialogVariants(), className)} {...props}>
    {children}
  </div>
);

export default Dialog;
