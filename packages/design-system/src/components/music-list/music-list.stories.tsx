import type { Meta, StoryObj } from '@storybook/react';

import MusicList from './music-list';

const meta: Meta<typeof MusicList> = {
  title: 'Common/Music/MusicList',
  tags: ['autodocs'],
  component: MusicList,
  argTypes: {
    onClickPlayToggle: { table: { disable: true } },
    onClickDelete: { table: { disable: true } },
    getDragHandleProps: { table: { disable: true } },
  },
  parameters: {
    componentSubtitle: '음악 리스트 컴포넌트',
    docs: {
      description: {
        component: `MusicList는 여러 개의 MusicItem을 리스트 형태로 렌더링하는 컴포넌트입니다.

음악 데이터 배열(musics)을 받아 각 아이템을 상태(variant)에 따라 다르게 표현합니다.
- 'default': 재생/일시정지 버튼이 표시되며, onClickPlayToggle을 통해 클릭 시 해당 음악 ID를 전달합니다.
- 'editable': 드래그 핸들과 삭제 버튼이 함께 표시되며, getDragHandleProps와 onClickDelete를 통해 제어됩니다.
- 'confirmDelete': 삭제 아이콘만 표시되며, onClickDelete로 삭제 동작을 전달합니다.

이 컴포넌트는 리스트 전체의 렌더링과 상호작용 제어를 담당하며, 개별 아이템과의 연결은 내부에서 music.id를 기반으로 이루어집니다.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MusicList>;

const mockMusics = [
  {
    id: '1',
    albumImage: 'https://i.imgur.com/DwH8XUo.png',
    title: 'Hi Bully',
    artist: 'TOUCHED',
    isPlaying: false,
  },
  {
    id: '2',
    albumImage: 'https://i.imgur.com/DwH8XUo.png',
    title: '새벽별',
    artist: 'TOUCHED',
    isPlaying: true,
  },
  {
    id: '3',
    albumImage: 'https://i.imgur.com/DwH8XUo.png',
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
