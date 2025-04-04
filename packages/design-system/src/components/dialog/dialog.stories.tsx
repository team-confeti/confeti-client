import type { Meta, StoryObj } from '@storybook/react';

import { Button, Dialog, OverlayProvider } from '@confeti/design-system';

import { useOverlay } from '../../context/overlay-context';
import { themeVars } from '../../styles';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dialog 컴포넌트는 사용자에게 중요한 정보를 표시하거나 작업을 요청하는 모달 다이얼로그를 제공합니다. \n\n' +
          '- Root: 다이얼로그의 기본 컨테이너로, 백드롭과 모달 창을 관리합니다. `open` 속성을 통해 표시 여부를 제어하고, `backDrop` 속성으로 배경 오버레이를 설정할 수 있습니다. \n\n' +
          '- Content: 다이얼로그 내용을 감싸는 컨테이너로, 제목과 설명 텍스트를 적절히 배치합니다. \n\n' +
          '- Title: 다이얼로그의 제목을 표시하는 요소로, 주요 목적이나 메시지를 간결하게 전달합니다. \n\n' +
          '- Description: 다이얼로그의 상세 내용이나 부가 설명을 제공하는 텍스트 요소입니다. \n\n' +
          '- Action: 다이얼로그 하단에 위치한 버튼 영역으로, 돌아가기, 탈퇴/로그아웃 등의 사용자 응답을 처리합니다. \n\n' +
          '이 컴포넌트는 `useOverlay` 훅과 함께 사용하여 쉽게 다이얼로그를 열고 닫을 수 있습니다. OverlayProvider를 통해 애플리케이션에서 일관된 방식으로 모달을 관리할 수 있습니다.',
      },
    },
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
    handleClose: {
      description: '다이얼로그를 닫는 함수',
    },
    backDrop: {
      control: 'boolean',
      description: '다이얼로그 뒤의 백드롭 표시 여부',
      defaultValue: true,
    },
  },
};

export default meta;

const RenderDialog = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close }) => (
      <Dialog open={isOpen} backDrop={true} handleClose={close}>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
        </Dialog.Content>
        <Dialog.Action>
          <Button text="cancel" onClick={close} variant="cancel" />
          <Button text="default" onClick={close} />
        </Dialog.Action>
      </Dialog>
    ));
  };

  return (
    <Button
      text="Trigger"
      onClick={openDialog}
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
      <RenderDialog />
    </div>
  ),
};
