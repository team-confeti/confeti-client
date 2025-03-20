import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
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
