import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from './floating-button';

const meta: Meta<typeof FloatingButton> = {
  title: 'Common/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
