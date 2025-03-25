import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

import { BtnKebabActive, BtnKebabDefault } from '@confeti/design-system/icons';

interface Props {
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
}

const MoreButton = ({ isActive: controlledIsActive, onToggle }: Props) => {
  const [isActive, setIsActive] = useState(controlledIsActive ?? false);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <IconButton
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
