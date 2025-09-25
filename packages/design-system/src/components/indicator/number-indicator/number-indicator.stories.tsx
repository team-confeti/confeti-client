import type { Meta, StoryObj } from '@storybook/react';

import NumberIndicator from './number-indicator';

const meta: Meta<typeof NumberIndicator> = {
  title: 'Common/Indicator/NumberIndicator',
  component: NumberIndicator,
  parameters: {
    layout: 'centered',
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
          'NumberIndicator 컴포넌트는 "1/3", "2/5" 형태로 현재 위치를 숫자로 표시하는 인디케이터입니다. \n\n' +
          '1. **total**: 전체 항목의 개수를 설정합니다.\n' +
          '2. **current**: 현재 활성화된 항목의 인덱스를 설정합니다. (0부터 시작)',
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
