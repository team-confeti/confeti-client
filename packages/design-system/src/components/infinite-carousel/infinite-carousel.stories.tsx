import type { Meta } from '@storybook/react';
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

export const Default = () => (
  <InfiniteCarousel.Image>
    <InfiniteCarousel.Info>
      <InfiniteCarousel.Dday day="2024.01.14" />
      <InfiniteCarousel.Artist artist="고고학" subtitle="공연 예매" />
    </InfiniteCarousel.Info>
  </InfiniteCarousel.Image>
);
