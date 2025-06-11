import { Icon } from '../../icons';

import { chipVariants } from './chip.css';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'default' | 'active' | 'withDelete';
  onDelete?: () => void;
}

const Chip = ({
  label,
  variant = 'default',
  onDelete,
  ...props
}: ChipProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <button className={chipVariants({ variant })} {...props}>
      {label}
      {variant === 'withDelete' && (
        <Icon
          name="close"
          size="1.3rem"
          color="gray500"
          onClick={handleDeleteClick}
        />
      )}
    </button>
  );
};

export default Chip;
