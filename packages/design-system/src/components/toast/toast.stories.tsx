import type { Meta, StoryObj } from '@storybook/react';
import { Button, ToastContainer, toast } from '@confeti/design-system';
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
        <Toast toastId="toast" text="Toast 컴포넌트 예시" autoClose={999999} />
      </div>
    ) : (
      <div />
    );
  },
};

export const Example: Story = {
  args: {
    showToast: false,
  },
  render: (args) => {
    const handleButtonClick = () => {
      toast.success('두 글자 이상 입력해주세요');
    };

    return (
      <div>
        <Button onClick={handleButtonClick}>
          이 버튼을 누르면 토스트가 뜹니다
        </Button>
        {args.showToast && <Toast toastId="toast" text="Toast 컴포넌트 예시" />}
      </div>
    );
  },
};
