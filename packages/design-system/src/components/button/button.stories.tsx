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
  },
};

export const Add: Story = {
  args: {
    variant: 'add',
    disabled: false,
  },
};

export const AddDisabled: Story = {
  args: {
    variant: 'add',
    disabled: true,
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    disabled: false,
  },
};
