import { Meta } from '@storybook/react';
import PerformanceCarousel from './performance-carousel';
import { BANNER_DATA } from './mocks/bottom-banner-data';

const meta: Meta<typeof PerformanceCarousel.Wrap> = {
  title: 'Common/PerformanceCarousel',
  component: PerformanceCarousel.Wrap,
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
    <div style={{ width: '375px' }}>
      <PerformanceCarousel.Wrap
        performances={bannerData}
        indexData={TotalIndexData}
      />
    </div>
  );
};
