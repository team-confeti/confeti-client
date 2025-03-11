import { Header } from '@confeti/design-system';
import { BtnDeleteBlack20 } from '@confeti/design-system/icons';
import { Button } from '@confeti/design-system';
const login = () => {
  return (
    <section>
      <Header
        variant="detail"
        title="로그인"
        icon={<BtnDeleteBlack20 width={'2rem'} height={'2rem'} />}
      />
      <Button text="카카오로 계속하기" variant="kakao" />
    </section>
  );
};

export default login;
