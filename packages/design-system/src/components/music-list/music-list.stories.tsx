import type { Meta, StoryObj } from '@storybook/react';

import MusicList from './music-list';

const meta: Meta<typeof MusicList> = {
  title: 'Common/MusicList',
  tags: ['autodocs'],
  component: MusicList,
  argTypes: {
    onClickPlayToggle: { table: { disable: true } },
    onClickDelete: { table: { disable: true } },
    getDragHandleProps: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof MusicList>;

const mockMusics = [
  {
    id: '1',
    albumImage:
      'https://i.namu.wiki/i/NLzYH6K7vddHDnHqWKL21F2X4JytE4_w-JHkrKCUUn8PU8eb18yoTCyQU9Iqy034IcixBv9JdE_vfsJAZiy_rw.webp',
    title: 'Hi Bully',
    artist: 'TOUCHED',
    isPlaying: false,
  },
  {
    id: '2',
    albumImage:
      'https://i.namu.wiki/i/PKc7mNUiEkuzA5TAU9nFMvNs3EvjIwp0-EbO-irpGxFozPkY-T9t0H9HBT-vo5zUB9cv1V_NvMlFnDg-gQmdNw.jpg',
    title: '새벽별',
    artist: 'TOUCHED',
    isPlaying: true,
  },
  {
    id: '3',
    albumImage:
      'https://www.akbobada.com/home/akbobada/archive/akbo/img/20150912201238.jpg',
    title: 'Highlight',
    artist: 'TOUCHED',
    isPlaying: false,
  },
];

const wrapperStyle = {
  maxWidth: '375px',
  margin: '0 auto',
};

export const Default: Story = {
  args: {
    musics: mockMusics,
    variant: 'default',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicList {...args} />
    </div>
  ),
};

export const Editable: Story = {
  args: {
    musics: mockMusics,
    variant: 'editable',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicList {...args} />
    </div>
  ),
};

export const ConfirmDelete: Story = {
  args: {
    musics: mockMusics,
    variant: 'confirmDelete',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicList {...args} />
    </div>
  ),
};
