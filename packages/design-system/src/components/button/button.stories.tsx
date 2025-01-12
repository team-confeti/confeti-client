import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    text: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    disabled: false,
  },
};

export const Add: Story = {
  args: {
    type: 'add',
    disabled: false,
  },
};

export const AddDisabled: Story = {
  args: {
    type: 'add',
    disabled: true,
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    disabled: false,
  },
};
