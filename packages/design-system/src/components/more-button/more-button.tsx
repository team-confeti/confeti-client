import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

import { BtnKebabActive, BtnKebabDefault } from '@confeti/design-system/icons';

interface Props {
  className?: string;
  onToggle?: (isActive: boolean) => void;
}

const MoreButton = ({ className, onToggle }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <IconButton
      className={className}
      onClick={handleClick}
      aria-label="페스티벌 추가 또는 삭제"
      disableRipple
    >
      {isActive ? (
        <BtnKebabActive width={30} height={30} />
      ) : (
        <BtnKebabDefault width={30} height={30} />
      )}
    </IconButton>
  );
};

export default MoreButton;
