import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FestivalButton from '@pages/time-table/components/festival-selector/festival-button';
import { useFestivalButtonData } from '@pages/time-table/hooks/use-festival-data';
import { useDeleteTimeTableFestival } from '@pages/time-table/hooks/use-timetable-festival-mutation';

import { Button, Dialog, Header, useOverlay } from '@confeti/design-system';
import {
  CheckboxFestival,
  CheckboxFestivalActive,
} from '@confeti/design-system/icons';
import { cn } from '@confeti/design-system/utils';

import * as styles from './delete-festival-page.css';

const DeleteFestivalPage = () => {
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const { festivals } = useFestivalButtonData();

  const deleteFestival = useDeleteTimeTableFestival();
  const overlay = useOverlay();
  const navigate = useNavigate();
  const numberToDelete = festivalsToDelete.length;

  const handleToggleFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) =>
      prev.includes(festivalId)
        ? prev.filter((id) => id !== festivalId)
        : [...prev, festivalId],
    );
  };

  const handleConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <ConfirmDialog
        numberToDelete={numberToDelete}
        isOpen={isOpen}
        onClose={close}
        onConfirm={async () => {
          await Promise.all(
            festivalsToDelete.map((id) => deleteFestival.mutateAsync(id)),
          );

          // 삭제 mutation 모두 완료 후 성공 모달창 open
          overlay.open(({ isOpen, close }) => (
            <SuccessDialog
              isOpen={isOpen}
              onClose={() => {
                close();
                navigate(-1);
              }}
            />
          ));
        }}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <Header variant="detail" title="페스티벌 삭제하기" />
      <main className={styles.festivalSelectorWrapper}>
        <div className={styles.festivalButtonsWrapper}>
          {festivals.map(({ festivalId, title, logoUrl }) => (
            <FestivalButton
              isSelected={false}
              imgUrl={logoUrl}
              title={title}
              key={festivalId}
              onClick={() => handleToggleFestival(festivalId)}
              className={cn(styles.festivalButtonBox)}
            >
              <input
                type="checkbox"
                checked={festivalsToDelete.includes(festivalId)}
                onChange={() => handleToggleFestival(festivalId)}
                className={styles.checkBox}
              />
              {/* 체크 상태에 따라 active 또는 inactive 컴포넌트 렌더링 */}
              {festivalsToDelete.includes(festivalId) ? (
                <CheckboxFestivalActive
                  width={'2.2rem'}
                  height={'2.2rem'}
                  className={styles.checkboxBase}
                />
              ) : (
                <CheckboxFestival
                  width={'2.2rem'}
                  height={'2.2rem'}
                  className={styles.checkboxBase}
                />
              )}
            </FestivalButton>
          ))}
        </div>
      </main>
      <footer className={styles.buttonContainer}>
        <Button
          text={numberToDelete + ' ' + `개 항목 삭제하기`}
          className={styles.buttonStyle}
          onClick={handleConfirm}
          disabled={numberToDelete == 0}
        ></Button>
      </footer>
    </div>
  );
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  numberToDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  numberToDelete: number;
}) => (
  <Dialog open={isOpen} handleClose={onClose}>
    <Dialog.Content>
      <Dialog.Title>
        <span className={styles.modalText}>{numberToDelete + ' '}</span>개의
        공연을 삭제할까요?
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

const SuccessDialog = ({
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

export default DeleteFestivalPage;
