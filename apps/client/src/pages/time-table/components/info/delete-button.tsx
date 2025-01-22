import { BtnFestivalDelete } from '@confeti/design-system/icons';

import * as styles from './delete-button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFestivalDeleteMode: boolean;
  festivalId: number;
  onDelete: (festivalId: number) => void;
}

const DeleteButton = ({
  isFestivalDeleteMode,
  onDelete,
  festivalId,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={styles.closeBtn({ isFestivalDeleteMode })}
      onClick={() => onDelete(festivalId)}
      {...props}
    >
      <BtnFestivalDelete width={'2.4rem'} height={'2.4rem'}></BtnFestivalDelete>
    </button>
  );
};

export default DeleteButton;
