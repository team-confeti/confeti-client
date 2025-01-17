import { Meta } from '@storybook/react';
import TicketingCarousel from './ticketingCarousel-carousel';
import { BANNER_DATA } from './mocks/bottom-banner-data';

const meta: Meta<typeof TicketingCarousel.Wrap> = {
  title: 'Common/Carousel/TicketingCarousel',
  component: TicketingCarousel.Wrap,
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
      <TicketingCarousel.Wrap
        performances={bannerData}
        indexData={TotalIndexData}
      />
    </div>
  );
};
