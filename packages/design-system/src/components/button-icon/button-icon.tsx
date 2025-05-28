import { ButtonHTMLAttributes, type ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  ariaLabel: string;
  icon: ReactNode;
}

const ButtonIcon = ({ onClick, ariaLabel, icon }: Props) => {
  return (
    <button onClick={onClick} aria-label={ariaLabel}>
      {icon}
    </button>
  );
};

export default ButtonIcon;
