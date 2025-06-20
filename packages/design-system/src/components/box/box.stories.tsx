import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../icons';
import Box from './box';

const meta: Meta<typeof Box> = {
  title: 'Common/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    componentSubtitle: '박스 컴포넌트',
    docs: {
      description: {
        component: `
Box 컴포넌트는 제목과 버튼이 포함된 컨테이너입니다.

- \`title\`: 박스 상단 제목
- \`titleSize\`: 제목 크기 (기본값: 'md', 선택값: 'lg')
- \`subtitle\`: 박스 상단 서브타이틀
- \`subtitleIcon\`: 박스 상단 서브타이틀 아이콘
- \`onShowMore\`: 버튼 클릭 시 호출될 함수
- \`showMoreText\`: 우측 상단 버튼의 텍스트 (예: '더보기', '전체보기')
- \`children\`: 콘텐츠 영역으로 렌더링될 컴포넌트

  \`onShowMore\`이 제공되면 버튼이 노출되며, \`onShowMore\`이 호출됩니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          border: '1px solid #ccc',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    title: '박스 제목',
    children: <p>이곳은 콘텐츠 영역입니다.</p>,
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    title: '박스 제목',
    children: <p>이곳은 콘텐츠 영역입니다.</p>,
  },
};

export const WithLargeTitleSize: Story = {
  name: 'With Large Title Size',
  args: {
    title: '박스 제목',
    titleSize: 'lg',
    children: <p>이곳은 콘텐츠 영역입니다.</p>,
  },
};

export const WithShowMoreButton: Story = {
  name: 'With Show More Button',
  args: {
    onShowMore: () => {
      console.log('더보기 버튼 클릭');
    },
    showMoreText: '더보기',
    children: <p>더보기 버튼이 있는 콘텐츠</p>,
  },
};

export const WithSubtitle: Story = {
  name: 'With Subtitle',
  args: {
    subtitle: '부제목',
    children: <p>부제목이 있는 콘텐츠</p>,
  },
};

export const WithSubtitleIcon: Story = {
  name: 'With Subtitle Icon',
  args: {
    subtitle: '부제목',
    subtitleIcon: <Icon name="heart-filled" size="1.4rem" />,
    children: <p>부제목과 아이콘이 있는 콘텐츠</p>,
  },
};
