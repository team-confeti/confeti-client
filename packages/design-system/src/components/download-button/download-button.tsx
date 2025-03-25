import { IconButton } from '@mui/material';

import { BtnDownload } from '@confeti/design-system/icons';

interface Props {
  onClick?: () => void;
}

const DownloadButton = ({ onClick }: Props) => {
  return (
    <IconButton onClick={onClick} aria-label="이미지 저장" disableRipple>
      <BtnDownload width={50} height={50} />
    </IconButton>
  );
};

export default DownloadButton;
