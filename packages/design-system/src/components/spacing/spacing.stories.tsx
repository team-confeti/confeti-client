import type { Meta, StoryObj } from '@storybook/react';
import Spacing from './spacing';

const meta: Meta<typeof Spacing> = {
  title: 'Common/Spacing',
  component: Spacing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'gray',
  },
  decorators: [
    (Story) => (
      <div>
        <div>Component</div>
        <Story />
        <div>Component</div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const White: Story = {
  args: {
    color: 'white',
  },
};
