import { cn } from '@confeti/design-system/utils';
import { addButtonVariants } from './add-button.css';
import SvgBtnAddGray24 from 'node_modules/@confeti/design-system/src/icons/src/BtnAddGray24';

interface AddButtonProps {
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const AddButton = ({ onClick, size = 'md' }: AddButtonProps) => {
  return (
    <button className={cn(addButtonVariants({ size: size }))} onClick={onClick}>
      <SvgBtnAddGray24 width={'2rem'} height={'2rem'} />
    </button>
  );
};

export default AddButton;
