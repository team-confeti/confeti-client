import { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar 컴포넌트는 사용자 아바타 이미지를 표시하는 컴포넌트입니다. \n\n' +
          '1. **src**: 아바타 이미지의 소스를 설정하는 속성입니다.\n' +
          '2. **size**: 아바타의 크기를 설정할 수 있습니다. (xs, sm, md, lg, xl)\n' +
          '3. **alt**: 아바타 이미지에 대한 설명을 제공하는 대체 텍스트입니다.\n' +
          '3. **fallback**: 이미지가 없을 때 기본으로 표시할 내용입니다.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
    src: '',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
  },
};

export const XsmallAvatar: Story = {
  args: {
    size: 'xs',
    src: 'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
  },
};

export const SmallAvatar: Story = {
  args: {
    size: 'sm',
    src: 'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
  },
};

export const LargeAvatar: Story = {
  args: {
    size: 'lg',
    src: 'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
  },
};

export const XlargeWithFallback: Story = {
  args: {
    size: 'xl',
  },
};
