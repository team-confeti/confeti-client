import type { Meta, StoryObj } from '@storybook/react';
import ArtistCard from './artist-card';

const meta: Meta<typeof ArtistCard> = {
  title: 'Common/ArtistCard',
  component: ArtistCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [{ id: 1, name: '데이식스', image: 'https://dummyimage.com/80X80' }],
    size: 'myArtist',
  },
};
