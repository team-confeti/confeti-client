import { Icon } from '../../icons';

import { chipVariants } from './chip.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'choice' | 'input' | 'assist';
  selected?: boolean;
  children: React.ReactNode;
  onDelete?: () => void;
}

const Chip = ({ variant, selected, children, onDelete, ...props }: Props) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <button
      className={chipVariants({
        variant,
        selected: !!selected,
      })}
      {...props}
    >
      {children}
      {variant === 'input' && (
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
