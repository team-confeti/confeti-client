import type { Meta, StoryObj } from '@storybook/react';

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
- \`showMore\`: 버튼 노출 여부 (true/false)
- \`showMoreText\`: 우측 상단 버튼의 텍스트 (예: '더보기', '전체보기')
- \`path\`: 버튼 클릭 시 이동할 경로
- \`children\`: 콘텐츠 영역으로 렌더링될 컴포넌트

\`showMoreText\`이 제공되면 버튼이 노출되며, \`path\`가 있으면 클릭 시 해당 경로로 이동합니다.
        `,
      },
    },
  },
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

export const WithButtonLabel: Story = {
  name: '더보기 버튼',
  args: {
    showMore: true,
    showMoreText: '더보기',
    path: '/more',
    children: <p>더보기 버튼이 있는 콘텐츠</p>,
  },
};

export const WithAllButton: Story = {
  name: '전체보기 버튼',
  args: {
    showMore: true,
    showMoreText: '전체보기',
    path: '/all',
    children: <p>전체보기가 필요한 콘텐츠</p>,
  },
};
