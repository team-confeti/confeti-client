import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Common/InfiniteCarousel/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
