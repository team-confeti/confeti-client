import { Meta, StoryObj } from '@storybook/react';

import Skeleton from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Common/Skeleton',
  component: Skeleton,
  parameters: {
    componentSubtitle: '로딩 상태를 표시하는 스켈레톤 컴포넌트',
    layout: 'centered',
    docs: {
      description: {
        component:
          'Skeleton 컴포넌트는 콘텐츠가 로드 중일 때 사용자에게 시각적 피드백을 제공해요.\n\n' +
          '1. **variants**: `default`, `rounded`, `rectangular` 중 선택 가능해요.\n' +
          '2. **width/height**: 크기를 지정할 수 있어요. 단위는 `rem`  `10rem` 형태로 입력 가능해요.\n' +
          '3. **style/className**: 필요에 따라 커스터마이징이 가능해요.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: '15rem',
    height: '1.8rem',
    variants: 'default',
  },
};

export const Rounded: Story = {
  args: {
    width: '6rem',
    height: '6rem',
    variants: 'rounded',
  },
};

export const Rectangular: Story = {
  args: {
    width: '100%',
    height: '1.6rem',
    variants: 'rectangular',
  },
};

export const CustomSizeWithStyle: Story = {
  args: {
    width: '20rem',
    height: '10rem',
    variants: 'default',
    style: { marginTop: '16px', marginBottom: '16px' },
  },
};
