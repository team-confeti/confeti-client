import { Header } from '@confeti/design-system';
import { BtnDeleteBlack20 } from '@confeti/design-system/icons';
const login = () => {
  return (
    <Header
      variant="detail"
      title="로그인"
      icon={<BtnDeleteBlack20 width={'2rem'} height={'2rem'} />}
    />
  );
};

export default login;
