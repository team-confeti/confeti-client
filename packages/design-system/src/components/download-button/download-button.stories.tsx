import type { Meta, StoryObj } from '@storybook/react';

import DownloadButton from './download-button';

const meta: Meta<typeof DownloadButton> = {
  title: 'Common/DownloadButton',
  component: DownloadButton,
  parameters: {
    componentSubtitle: '이미지 저장 버튼 컴포넌트',
    layout: 'centered',
    docs: {
      description: {
        component: 'DownloadButton은 이미지 저장 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
