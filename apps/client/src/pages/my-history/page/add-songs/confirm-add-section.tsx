import { Button, Dialog, MusicItem, useOverlay } from '@confeti/design-system';
import { BtnArrowLeft20 } from '@confeti/design-system/icons';

import * as styles from './confirm-add-section.css';

const ConfirmAddSection = () => {
  const totalNum = 6;
  const overlay = useOverlay();

  const handleOpenDeleteDialog = ({ title }: { title: string }) => {
    overlay.open(({ isOpen, close }) => (
      <Dialog open={isOpen} handleClose={close}>
        <Dialog.Content>
          <Dialog.Title>
            <div className={styles.dialogTitleContainer}>
              <p className={styles.dialogHighlightText}>{title}</p>
            </div>
            <span>을(를) 삭제할까요?</span>
          </Dialog.Title>
          <Dialog.Description>
            대기열에서 해당 곡이 삭제됩니다.
          </Dialog.Description>
        </Dialog.Content>
        <Dialog.Action>
          <Button text="돌아가기" onClick={close} variant="back" />
          <Button
            text="삭제하기"
            onClick={() => {
              close();
            }}
          />
        </Dialog.Action>
      </Dialog>
    ));
  };

  return (
    <div>
      <header className={styles.headerContainer}>
        <button aria-label="뒤로가기">
          <BtnArrowLeft20 width={'2rem'} height={'2rem'} />
        </button>
      </header>
      <div className={styles.textContainer}>
        <p className={styles.totalNumText}>총 {totalNum}곡</p>
        <p className={styles.confirmText}>선택하신 곡 목록이 맞나요?</p>
      </div>
      <div className={styles.musicListContainer}>
        <MusicItem
          albumImage=""
          title="test"
          artist="test"
          variant="confirmDelete"
          onClickDelete={() =>
            handleOpenDeleteDialog({ title: 'Highlight-Toched' })
          }
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button text="셋리스트에 추가하기" />
      </div>
    </div>
  );
};

export default ConfirmAddSection;
