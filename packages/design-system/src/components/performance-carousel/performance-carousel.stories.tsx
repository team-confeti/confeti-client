import type { Meta } from '@storybook/react';
import PerformanceCarousel from './performance-carousel';
import { PerformData } from './performance-carousel';

const MOCK_PERFORM_DATA: PerformData[] = [
  {
    typeId: 1,
    type: 'FESTIVAL',
    title: '러브 썸 페스티벌',
    subtitle: 'LOVESOME',
    performanceAt: '2025.04.27',
    posterUrl: 'https://i.imgur.com/b89Kzzd.png',
  },
  {
    typeId: 2,
    type: 'FESTIVAL',
    title: '뷰티풀 민트 라이프',
    subtitle: 'Beautiful Mint Life 2025',
    performanceAt: '2025.05.11',
    posterUrl: 'https://i.imgur.com/9yX1b3P.png',
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
