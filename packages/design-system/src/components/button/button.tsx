import { cn } from '../../utils';
import { buttonVariants } from './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'add' | 'link' | 'default';
  disabled?: boolean;
  className?: string;
}

const Button = ({
  text,
  variant = 'default',
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant: variant, disabled }), className)}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
