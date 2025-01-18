import { MemoryRouter } from 'react-router-dom';
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
      <MemoryRouter>
        <div style={{ width: '375px' }}>
          <Story />
        </div>
      </MemoryRouter>
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
    title: '데이식스',
    imageSrc: 'https://dummyimage.com/80X80',
    size: 'lg',
  },
};

export const Sm: Story = {
  args: {
    artistId: '1',
    title: '데이식스',
    imageSrc: 'https://dummyimage.com/80X80',
    size: 'sm',
  },
};

export const Md: Story = {
  args: {
    artistId: '1',
    title: '데이식스',
    imageSrc: 'https://dummyimage.com/80X80',
    size: 'md',
  },
};
