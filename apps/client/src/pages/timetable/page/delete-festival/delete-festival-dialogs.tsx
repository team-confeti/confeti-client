import { useEffect } from 'react';

import { Button, Dialog } from '@confeti/design-system';
import { cn } from '@confeti/design-system/utils';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  numberToDelete,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  numberToDelete: number;
  className?: string;
}) => (
  <Dialog open={isOpen} handleClose={onClose}>
    <Dialog.Content>
      <Dialog.Title>
        <span className={cn(className)} style={{ marginRight: '0.2rem' }}>
          {numberToDelete}
        </span>
        개의 공연을 삭제할까요?
      </Dialog.Title>

      <Dialog.Description>
        <p>제작했던 타임테이블은</p>
        <p>&apos;내 공연&apos; 페이지에서 다시 볼 수 있어요.</p>
      </Dialog.Description>
    </Dialog.Content>
    <Dialog.Action>
      <Button text="돌아가기" onClick={onClose} variant="back" />
      <Button text="삭제하기" onClick={onConfirm} />
    </Dialog.Action>
  </Dialog>
);

export const SuccessDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // 모달창 2초 후 자동 닫힘
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen}>
      <Dialog.Content>
        <Dialog.Title>성공적으로 삭제되었어요.</Dialog.Title>
      </Dialog.Content>
    </Dialog>
  );
};
