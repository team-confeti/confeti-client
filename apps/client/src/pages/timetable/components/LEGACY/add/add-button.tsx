import { Icon } from '@confeti/design-system/icon';
import { cn } from '@confeti/design-system/utils';

import { addButtonVariants } from './add-button.css';

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled: boolean;
}

const AddButton = ({
  onClick,
  size = 'md',
  disabled,
  ...props
}: AddButtonProps) => {
  return (
    <button
      className={cn(addButtonVariants({ size: size }))}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      <Icon name="add" size="2rem" color="gray400" />
    </button>
  );
};

export default AddButton;
