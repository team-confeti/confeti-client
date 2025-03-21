import type { Meta, StoryObj } from '@storybook/react';

import { Button, toast, ToastContainer } from '@confeti/design-system';

import Toast from './toast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Common/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <ToastContainer />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    showToast: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    showToast: true,
    position: 'bottomCenter',
    text: 'Toast 컴포넌트 예시',
    icon: 'default',
    autoClose: false,
  },
  render: (args) => {
    return args.showToast ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '4vh',
        }}
      >
        <Toast
          toastId="toast"
          text={args.text}
          position={args.position}
          icon={args.icon}
          autoClose={args.autoClose}
          closeOnClick={args.closeOnClick}
          highlightText={args.highlightText}
          className={args.className}
        />
      </div>
    ) : (
      <div />
    );
  },
};

export const Example: Story = {
  args: {
    position: 'bottomCenter',
    text: '알림 메시지 예시입니다.',
    icon: 'default',
  },
  render: (args) => {
    const handleButtonClick = () => {
      toast({
        text: args.text,
        position: args.position,
        icon: args.icon,
        autoClose: args.autoClose,
        closeOnClick: args.closeOnClick,
        highlightText: args.highlightText,
        className: args.className,
      });
    };

    return (
      <div>
        <Button
          onClick={handleButtonClick}
          text="이 버튼을 누르면 토스트가 나와요!"
        />
        {args.showToast && (
          <Toast
            toastId="toast"
            text={args.text}
            position={args.position}
            icon={args.icon}
            autoClose={args.autoClose}
            closeOnClick={args.closeOnClick}
            highlightText={args.highlightText}
            className={args.className}
          />
        )}
      </div>
    );
  },
};
