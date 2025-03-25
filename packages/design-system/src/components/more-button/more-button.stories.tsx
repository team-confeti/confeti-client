import type { Meta, StoryObj } from '@storybook/react';

import MoreButton from './more-button';

const meta: Meta<typeof MoreButton> = {
  title: 'Common/MoreButton',
  component: MoreButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: '',
    onToggle: (isActive) =>
      console.log(`MoreButton is ${isActive ? 'Active' : 'Inactive'}`),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
  render: (args) => (
    <div>
      <MoreButton {...args} />
    </div>
  ),
};

export const Active: Story = {
  render: (args) => (
    <div>
      <MoreButton {...args} />
    </div>
  ),
  play: ({ args }) => {
    args.onToggle?.(true);
  },
};
