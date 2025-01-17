import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Common/PerformanceCarousel/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;

export const Medium: StoryObj<typeof ProgressBar> = {
  render: () => <ProgressBar current={1} total={5} size="md" />,
};
