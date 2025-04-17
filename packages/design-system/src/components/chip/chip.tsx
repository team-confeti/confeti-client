import { BtnSearchDelete } from '@confeti/design-system/icons';

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
        <BtnSearchDelete
          onClick={handleDeleteClick}
          width="1.6rem"
          height="1.6rem"
        />
      )}
    </button>
  );
};

export default Chip;
