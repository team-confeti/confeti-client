import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authTokenHandler } from '@confeti/core/auth';
import { Button, Dialog } from '@confeti/design-system';
import { useOverlay } from '@confeti/design-system';

import { AUTH_MUTATION_OPTIONS } from '@shared/apis/auth/auth-mutations';
import { routePath } from '@shared/router/path';

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    ...AUTH_MUTATION_OPTIONS.POST_LOGOUT(),
    onSuccess: () => {
      queryClient.clear();
      authTokenHandler('remove');
      navigate(`${routePath.ROOT}`);
    },
  });
  const overlay = useOverlay();

  const handleLogout = () => {
    overlay.open(({ isOpen, close }) => (
      <LogoutDialog
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          mutate();
          close();
        }}
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
