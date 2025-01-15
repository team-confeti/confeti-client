import { Meta } from '@storybook/react';
import InfiniteCarousel from './infinite-carousel';
import { BANNER_DATA } from './mocks/bottom-banner-data';

const meta: Meta<typeof InfiniteCarousel.Wrap> = {
  title: 'Common/InfiniteCarousel',
  component: InfiniteCarousel.Wrap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

const bannerData = BANNER_DATA?.data?.performances || [];
const TotalIndexData = BANNER_DATA?.data?.performanceCount;

export default meta;

export const Default = () => {
  return (
    <InfiniteCarousel.Wrap
      performances={bannerData}
      indexData={TotalIndexData}
    />
  );
};
