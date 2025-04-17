import { useLogoutMutation } from '@pages/my/hooks/use-logout';

import { Button, Dialog } from '@confeti/design-system';
import { useOverlay } from '@confeti/design-system';

import * as styles from './logout-section.css';

const LogoutDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Dialog open={isOpen} handleClose={onClose}>
    <Dialog.Content>
      <Dialog.Title>로그아웃</Dialog.Title>
      <Dialog.Description>로그아웃 하시겠어요?</Dialog.Description>
    </Dialog.Content>
    <Dialog.Action>
      <Button text="돌아가기" onClick={onClose} variant="back" />
      <Button text="로그아웃" onClick={onConfirm} />
    </Dialog.Action>
  </Dialog>
);

const LogoutSection = () => {
  const { mutate: logout } = useLogoutMutation();
  const overlay = useOverlay();

  const handleLogout = () => {
    overlay.open(({ isOpen, close }) => (
      <LogoutDialog
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => logout()}
      />
    ));
  };

  return (
    <section className={styles.container}>
      <Button onClick={handleLogout} text="로그아웃" variant="logout" />
    </section>
  );
};

export default LogoutSection;
