import type { Meta, StoryObj } from '@storybook/react';

import MusicItem from './music-item';

const meta: Meta<typeof MusicItem> = {
  title: 'Common/Music/MusicItem',
  component: MusicItem,
  tags: ['autodocs'],
  args: {
    albumImage:
      'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
    title: '새벽별',
    artist: 'TOUCHED',
  },
  argTypes: {
    onClickPlayToggle: { table: { disable: true } },
    onClickDelete: { table: { disable: true } },
    dragHandleProps: { table: { disable: true } },
  },
  parameters: {
    componentSubtitle: '음악 아이템 컴포넌트',
    docs: {
      description: {
        component: `MusicItem은 음악 리스트 내에서 단일 아이템을 렌더링하는 공통 컴포넌트입니다. 앨범 커버, 제목, 아티스트 정보를 기본으로 표시하며, 다양한 상태(기본/편집/삭제 확인)에 따라 우측 아이콘 또는 앨범 커버 오버레이가 다르게 렌더링됩니다.
- 기본 상태: 재생/일시정지 토글 버튼이 우측에 표시됩니다.
- 편집 상태: 우측에 드래그 아이콘이 표시되며, 앨범 커버 위에 삭제 버튼 오버레이가 나타납니다.
- 삭제 확인 상태: '내 공연 - 검색' 기능에서 선택 완료 이후, 삭제용 아이콘만 표시되는 상태입니다.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MusicItem>;

const wrapperStyle = {
  maxWidth: '375px',
  margin: '0 auto',
};

export const Default: Story = {
  args: {
    variant: 'default',
    isPlaying: false,
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};

export const Playing: Story = {
  args: {
    variant: 'default',
    isPlaying: true,
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};

export const Editable: Story = {
  args: {
    variant: 'editable',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};

export const ConfirmDelete: Story = {
  args: {
    variant: 'confirmDelete',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};
