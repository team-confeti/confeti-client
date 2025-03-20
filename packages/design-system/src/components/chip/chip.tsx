import { BtnSearchDelete } from '@confeti/design-system/icons';

import { chipVariants } from './chip.css';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'home' | 'search';
  isActive?: boolean;
  onDelete?: () => void;
  onScrollToSection?: () => void;
  onActiveChange?: (label: string) => void;
}

const Chip = ({
  label,
  variant = 'home',
  isActive = false,
  onDelete,
  onScrollToSection,
  onActiveChange,
  ...props
}: ChipProps) => {
  const handleClick = () => {
    if (variant === 'home') {
      onActiveChange?.(label);
      onScrollToSection?.();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <button
      className={chipVariants({
        variant,
        isActive: variant === 'home' ? isActive : false,
      })}
      onClick={variant === 'home' ? handleClick : undefined}
      {...props}
    >
      {label}
      {variant === 'search' && <BtnSearchDelete onClick={handleDeleteClick} />}
    </button>
  );
};

export default Chip;
