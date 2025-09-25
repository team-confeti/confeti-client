import type { Meta, StoryObj } from '@storybook/react';

import NumberIndicator from './number-indicator';

const meta: Meta<typeof NumberIndicator> = {
  title: 'Common/Indicator/NumberIndicator',
  component: NumberIndicator,
  parameters: {
    layout: 'centered',
    componentSubtitle: '현재 위치를 나타내는 숫자 인디케이터 컴포넌트',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#43444B',
        },
      ],
    },
    docs: {
      description: {
        component:
          'NumberIndicator 컴포넌트는 "1/3", "2/5" 형태로 캐러셀에서 현재 위치를 숫자로 표시해요. \n\n' +
          '1. **total**: 전체 항목의 개수를 설정해요.\n' +
          '2. **current**: 현재 활성화된 항목의 인덱스를 설정해요. (0부터 시작)',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    total: 5,
    current: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 5,
    current: 1,
  },
};

export const LastItem: Story = {
  args: {
    total: 8,
    current: 7,
  },
};

export const SingleItem: Story = {
  args: {
    total: 1,
    current: 0,
  },
};
