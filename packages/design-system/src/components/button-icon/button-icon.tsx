import IconButton from '@mui/material/IconButton';

interface Props {
  onClick?: () => void;
  ariaLabel: string;
  icon: React.ReactNode;
}

const ButtonIcon = ({ onClick, ariaLabel, icon }: Props) => {
  return (
    <IconButton onClick={onClick} aria-label={ariaLabel} disableRipple>
      {icon}
    </IconButton>
  );
};

export default ButtonIcon;
