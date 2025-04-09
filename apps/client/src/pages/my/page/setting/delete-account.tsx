import RadioOption from '@pages/my/components/setting/radio-option';

import { Button, Footer, Header } from '@confeti/design-system';

import * as styles from './delete-account.css';

const DeleteAccount = () => {
  return (
    <>
      <Header variant="detail" title="회원탈퇴"></Header>
      <div className={styles.textStyle}>탈퇴하시려는 이유를 선택해주세요.</div>
      <div>
        <RadioOption></RadioOption>
      </div>
      <div>
        <Button variant="add" text="탈퇴하기"></Button>
      </div>
      <Footer></Footer>
    </>
  );
};

export default DeleteAccount;
