import type { Meta, StoryObj } from '@storybook/react';
import ArtistCard from './artist-card';

const meta: Meta<typeof ArtistCard> = {
  title: 'Common/Card/ArtistCard',
  component: ArtistCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    artistId: '1',
    title: '한로로',
    imageSrc:
      'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
    size: 'md',
  },
};

export const Sm: Story = {
  args: {
    artistId: '2',
    title: 'Coldplay',
    imageSrc:
      'https://i.scdn.co/image/ab6761610000f1781ba8fc5f5c73e7e9313cc6eb',
    size: 'sm',
  },
};

export const Md: Story = {
  args: {
    artistId: '3',
    title: '데이식스',
    imageSrc:
      'https://i.scdn.co/image/ab6761610000f17810e83b0ca558533d0f3c376c',
    size: 'md',
  },
};
