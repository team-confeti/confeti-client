import { cn } from '../../utils';
import { buttonVariants } from './button.css';
import SvgIcLink from '../../icons/src/IcLink';

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
  onClick,
}: ButtonProps) => {
  const linkIcon = variant === 'link' ? <SvgIcLink /> : null;

  return (
    <button
      className={cn(buttonVariants({ variant: variant, disabled }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      {linkIcon}
    </button>
  );
};

export default Button;
