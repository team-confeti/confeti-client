import { Meta, StoryObj } from '@storybook/react';

import TicketingCard from './ticketing-card';

const meta: Meta<typeof TicketingCard.Image> = {
  title: 'Common/Card/TicketingCard',
  component: TicketingCard.Image,
  parameters: {
    componentSubtitle: '티켓팅 카드 컴포넌트',
    layout: 'centered',
    docs: {
      description: {
        component:
          'TicketingCard.Image, TicketingCard.Dday, TicketingCard.SubTitle, TicketingCard.PerformanceInfo를 조합해서 사용할 수 있어요.\n\n' +
          '1. **Image**: 티켓팅카드 이미지 영역을 감싸는 컨테이너입니다.\n' +
          '2. **Dday**: 공연 날짜 또는 디데이를 표시하는 컴포넌트입니다.\n' +
          '3. **SubTitle**: 공연의 부제목을 표시하는 컴포넌트입니다.\n' +
          '4. **PerformanceInfo**: 공연 정보 확인 버튼을 렌더링하는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TicketingCard.Image>;

const samplePerformance = {
  reservationBgUrl: 'https://i.imgur.com/gJ7iUTp.png',
  reserveAt: 'D-3',
  subtitle: 'HAVE A NICE TRIP',
  type: 'FESTIVAL',
  typeId: 8,
};

export const Default: Story = {
  render: () => (
    <TicketingCard.Image
      imageUrl={samplePerformance.reservationBgUrl}
      textContent={
        <>
          <TicketingCard.Dday reserveAt={samplePerformance.reserveAt} />
          <TicketingCard.SubTitle subtitle={samplePerformance.subtitle} />
        </>
      }
      performanceInfoContent={
        <TicketingCard.PerformanceInfo
          title="공연 정보 확인하기"
          typeId={samplePerformance.typeId}
          performanceType={samplePerformance.type}
        />
      }
    />
  ),
};
