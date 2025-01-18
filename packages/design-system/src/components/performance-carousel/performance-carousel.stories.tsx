import type { Meta } from '@storybook/react';
import PerformanceCarousel from './performance-carousel';

const MOCK_PERFORM_DATA = [
  {
    performanceId: 1,
    type: 'concert',
    title: '오아시스 내한공연',
    subTitle: 'LIVE NATION PRESENTS COLDPLAY',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
  {
    performanceId: 2,
    type: 'festival',
    title: '오아시스 내한공연',
    subTitle: '',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
  {
    performanceId: 3,
    type: 'festival',
    title: '오아시스 내한공연3',
    subTitle: 'LIVE NATION PRESENTS COLDPLAY',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
  {
    performanceId: 4,
    type: 'festival',
    title: '오아시스 내한공연4',
    subTitle: '',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
  {
    performanceId: 5,
    type: 'festival',
    title: '오아시스 내한공연5',
    subTitle: 'LIVE NATION PRESENTS COLDPLAY',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
  {
    performanceId: 6,
    type: 'festival',
    title: '오아시스 내한공연6',
    subTitle: 'LIVE NATION PRESENTS COLDPLAY',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
  {
    performanceId: 7,
    type: 'festival',
    title: '오아시스 내한공연7',
    subTitle: '',
    performanceAt: '2025.10.21',
    posterUrl: 'https://dummyimage.com/197x262',
  },
];

const meta: Meta<typeof PerformanceCarousel> = {
  title: 'Common/Carousel/PerformanceCarousel',
  component: PerformanceCarousel,
  parameters: {
    layout: 'centered',
  },
  args: {
    performData: MOCK_PERFORM_DATA,
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <div
      style={{
        width: '375px',
        height: '500px',
        paddingTop: '10px',
        background: 'linear-gradient(180deg, #131433 -3.3%, #9747FF 89.71%)',
      }}
    >
      <PerformanceCarousel performData={MOCK_PERFORM_DATA} />
    </div>
  );
};
