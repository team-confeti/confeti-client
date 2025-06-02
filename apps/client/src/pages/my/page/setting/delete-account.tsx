import { useState } from 'react';
import { track } from '@amplitude/analytics-browser';
import { useDeleteAccountMutation } from '@pages/my/hooks/use-delete-account-mutation';

import {
  Button,
  Dialog,
  Footer,
  Header,
  useOverlay,
} from '@confeti/design-system';

import * as styles from './delete-account.css';

const DeleteAccount = () => {
  const overlay = useOverlay();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const deleteAccountMutation = useDeleteAccountMutation();

  const reasons = [
    { value: 'no_events', text: '원하는 공연이 많이 없어서' },
    { value: 'frequent_errors', text: '잦은 오류, 장애가 발생해서' },
    { value: 'inconvenient', text: '이용하는데 편리하지 않아서' },
    { value: 'rejoin', text: '다른 계정으로 재가입하려고' },
  ];

  const handleConfirmDeleteAccount = () => {
    // Amplitude에 탈퇴 사유 이벤트 전송
    track('User Withdrawal', {
      reason: selectedReason,
      reason_text: reasons.find((r) => r.value === selectedReason)?.text,
    });
    deleteAccountMutation.mutate();
  };

  const handleDialogOpen = () => {
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
          <Button
            text="탈퇴하기"
            onClick={() => {
              handleConfirmDeleteAccount();
              close();
            }}
          />
        </Dialog.Action>
      </Dialog>
    ));
  };

  return (
    <>
      <Header variant="detail" title="회원탈퇴" />
      <main className={styles.selectSection}>
        <div className={styles.textStyle}>
          탈퇴하시려는 이유를 선택해주세요.
        </div>
        <div className={styles.radioWrapper}>
          {reasons.map((reason) => (
            <label key={reason.value} className={styles.label}>
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
      </main>
      <div className={styles.buttonWrapper}>
        <Button
          variant="add"
          text="탈퇴하기"
          disabled={!selectedReason}
          onClick={handleDialogOpen}
        />
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccount;
