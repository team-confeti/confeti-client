import type { Meta, StoryObj } from '@storybook/react';

import { Button, Dialog, OverlayProvider } from '@confeti/design-system';

import { useOverlay } from '../../context/overlay-context';
import { themeVars } from '../../styles';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <OverlayProvider>
          <Story />
        </OverlayProvider>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '다이얼로그의 열림 상태',
      defaultValue: false,
    },
    backDrop: {
      control: 'boolean',
      description: '다이얼로그 뒤의 백드롭 표시 여부',
      defaultValue: true,
    },
  },
};

export default meta;

const LogoutDialog = () => {
  const overlay = useOverlay();

  const openLogoutDialog = () => {
    overlay.open(({ isOpen, close }) => (
      <Dialog open={isOpen} backDrop={true}>
        <Dialog.Content>
          <Dialog.Title>로그아웃</Dialog.Title>
          <Dialog.Description>로그아웃 하시겠어요?</Dialog.Description>
        </Dialog.Content>
        <Dialog.Action>
          <Button
            text="돌아가기"
            onClick={close}
            style={{ backgroundColor: themeVars.color.gray200 }}
          />
          <Button text="로그아웃" onClick={close} />
        </Dialog.Action>
      </Dialog>
    ));
  };

  return (
    <Button
      text="Trigger"
      onClick={openLogoutDialog}
      style={{ backgroundColor: themeVars.color.gray200, width: '7rem' }}
    >
      모달 열기
    </Button>
  );
};

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <div style={{ width: '430px', height: '50rem' }}>
      <LogoutDialog />
    </div>
  ),
};
