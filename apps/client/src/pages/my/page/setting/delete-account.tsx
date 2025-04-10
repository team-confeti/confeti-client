import RadioOption from '@pages/my/components/setting/radio-option';

import { Button, Footer, Header } from '@confeti/design-system';

import * as styles from './delete-account.css';

const DeleteAccount = () => {
  return (
    <>
      <Header variant="detail" title="회원탈퇴"></Header>
      <div className={styles.selectSection}>
        <div className={styles.textStyle}>
          탈퇴하시려는 이유를 선택해주세요.
        </div>
        <div className={styles.radioWrapper}>
          <RadioOption text="원하는 공연이 많이 없어서" />
          <RadioOption text="잦은 오류, 장애가 발생해서" />
          <RadioOption text="이용하는데 편리하지 않아서" />
          <RadioOption text="다른 계정으로 재가입하려고" />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="add" text="탈퇴하기" disabled={true} />
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccount;
