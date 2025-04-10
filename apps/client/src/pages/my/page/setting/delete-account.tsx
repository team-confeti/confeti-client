import { useState } from 'react';
import { useOverlay } from 'node_modules/@confeti/design-system/src/context/overlay-context';

import { Button, Dialog, Footer, Header } from '@confeti/design-system';

import * as styles from './delete-account.css';

const DeleteAccount = () => {
  const overlay = useOverlay();
  const [selectedReason, setSelectedReason] = useState<string>('');

  const reasons = [
    { value: 'no_events', text: '원하는 공연이 많이 없어서' },
    { value: 'frequent_errors', text: '잦은 오류, 장애가 발생해서' },
    { value: 'inconvenient', text: '이용하는데 편리하지 않아서' },
    { value: 'rejoin', text: '다른 계정으로 재가입하려고' },
  ];

  return (
    <>
      <Header variant="detail" title="회원탈퇴" />
      <div className={styles.selectSection}>
        <div className={styles.textStyle}>
          탈퇴하시려는 이유를 선택해주세요.
        </div>
        <div className={styles.radioWrapper}>
          {reasons.map((reason) => (
            <label key={reason.value} className={styles.wrapper}>
              <input
                type="radio"
                name="withdrawal_reason"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={() => setSelectedReason(reason.value)}
                className={styles.radioStyle}
              />
              <span>{reason.text}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          variant="add"
          text="탈퇴하기"
          disabled={!selectedReason}
          onClick={() =>
            overlay.open(({ isOpen, close }) => (
              <Dialog open={isOpen} handleClose={close}>
                <Dialog.Content>
                  <Dialog.Title>정말 confeti를 탈퇴하실건가요?</Dialog.Title>
                  <Dialog.Description>
                    탈퇴 시 계정 및 이용 기록은 모두 삭제되며, <br />
                    삭제된 데이터는 복구가 불가능합니다. <br />
                    탈퇴를 진행할까요?
                  </Dialog.Description>
                </Dialog.Content>
                <Dialog.Action>
                  <Button text="취소하기" onClick={close} variant="back" />
                  <Button text="탈퇴하기" onClick={close} />
                </Dialog.Action>
              </Dialog>
            ))
          }
        />
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccount;
