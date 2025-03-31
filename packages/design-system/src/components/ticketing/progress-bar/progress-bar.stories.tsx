import { Meta } from '@storybook/react';

import { BANNER_DATA } from '../mocks/bottom-banner-data';
import TicketingCarousel from '../ticketing-carousel';

const meta: Meta<typeof TicketingCarousel.Wrap> = {
  title: 'Common/Ticketing/ProgressBar',
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
    <div style={{ width: '335px', height: '700px' }}>
      <TicketingCarousel.Wrap
        performances={bannerData}
        indexData={TotalIndexData}
      />
    </div>
  );
};
