import type { Meta, StoryObj } from '@storybook/react';

import { BtnDownload } from '@confeti/design-system/icons';

import ButtonIcon from './button-icon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Common/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    componentSubtitle: '아이콘 버튼 컴포넌트',
    layout: 'centered',
    docs: {
      description: {
        component:
          'ButtonIcon은 다양한 아이콘을 감싸는 공통 버튼 컴포넌트입니다.\n\n' +
          '1. **icon**: 렌더링할 아이콘을 전달합니다.\n' +
          '2. **ariaLabel**: 접근성을 위한 설명을 설정합니다.\n' +
          '3. **onClick**: 버튼 클릭 시 실행할 이벤트 핸들러입니다.\n',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const DownloadButton: Story = {
  args: {
    ariaLabel: '이미지 저장 버튼',
    icon: <BtnDownload width={50} height={50} />,
  },
};
