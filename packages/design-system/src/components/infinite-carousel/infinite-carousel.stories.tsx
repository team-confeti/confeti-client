import type { Meta, StoryObj } from '@storybook/react';
import InfiniteCarousel from './infinite-carousel';

const meta: Meta<typeof InfiniteCarousel.Image> = {
  title: 'Common/InfiniteCarousel',
  component: InfiniteCarousel.Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
