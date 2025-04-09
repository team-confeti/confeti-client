import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button 컴포넌트는 다양한 형태의 버튼을 제공하는 공통 UI 요소입니다. \n\n' +
          '1. **variant**: 버튼의 스타일을 결정합니다. (default, add, link, logout, kakao, apple)\n' +
          '2. **disabled**: 버튼을 비활성화할지 여부를 설정합니다.\n' +
          '3. **text**: 버튼에 표시될 텍스트입니다.',
      },
    },
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
  args: {
    text: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    disabled: false,
    text: '추가하기',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '17.6rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Add: Story = {
  args: {
    variant: 'add',
    disabled: false,
    text: '추가하기',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '33.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const AddDisabled: Story = {
  args: {
    variant: 'add',
    disabled: true,
    text: '추가하기',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '33.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Link: Story = {
  args: {
    variant: 'link',
    disabled: false,
    text: '예매처 바로가기',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '33.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Logout: Story = {
  args: {
    variant: 'logout',
    disabled: false,
    text: '로그아웃',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '33.5rem' }}>
        <Story />
      </div>
    ),
  ],
};
