import type { Meta, StoryObj } from '@storybook/react';
import TopCarousel from './top-carousel';

const meta: Meta<typeof TopCarousel> = {
  title: 'Common/TopCarousel',
  component: TopCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
