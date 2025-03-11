import { cn } from '@confeti/design-system/utils';
import SvgBtnAddGray24 from 'node_modules/@confeti/design-system/src/icons/src/BtnAddGray24';

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
      <SvgBtnAddGray24 width={'2rem'} height={'2rem'} />
    </button>
  );
};

export default AddButton;
