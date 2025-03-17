import { Meta, StoryObj } from '@storybook/react';
import TicketingCard from './ticketing-card';

const meta: Meta<typeof TicketingCard.Root> = {
  title: 'Common/Ticketing/TicketingCard',
  component: TicketingCard.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof TicketingCard.Root>;

export const Default: Story = {
  render: () => (
    <TicketingCard.Root>
      <TicketingCard.Card
        performances={[
          {
            index: 1,
            reservationBgUrl:
              'https://confeti-bucket.s3.ap-northeast-2.amazonaws.com/festival/main-banner/main-banner-gogohack.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250317T180734Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAVVZOORJ3CWWPDD4H%2F20250317%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=600&X-Amz-Signature=35935a79f388a73c9b74ea2e4a1493765e855b65e883104129fe8c9d439eb4f',
            subtitle: 'Awesome Show',
            reserveAt: '2023-09-20',
            typeId: 1,
            type: 'Musical',
          },
          {
            index: 2,
            reservationBgUrl:
              'https://confeti-bucket.s3.ap-northeast-2.amazonaws.com/festival/main-banner/main-banner-gogohack.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250317T180734Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAVVZOORJ3CWWPDD4H%2F20250317%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=600&X-Amz-Signature=35935a79f388a73c9b74ea2e4a1493765e855b65e883104129fe8c9d439eb4f',
            subtitle: 'Awesome Show',
            reserveAt: '2023-09-20',
            typeId: 2,
            type: 'Musical',
          },
        ]}
      ></TicketingCard.Card>
    </TicketingCard.Root>
  ),
};
