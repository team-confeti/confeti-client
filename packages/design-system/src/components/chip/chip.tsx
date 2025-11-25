import { cn } from '@confeti/utils';

import { Icon } from '../../icons';

import { chipVariants } from './chip.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'choice' | 'input' | 'assist';
  selected?: boolean;
  children: React.ReactNode;
  onDelete?: () => void;
  className?: string;
}

const Chip = ({
  variant,
  selected,
  children,
  onDelete,
  className,
  ...props
}: Props) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <button
      className={cn(
        chipVariants({
          variant,
          selected: !!selected,
        }),
        className,
      )}
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
