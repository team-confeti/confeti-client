import type { Meta, StoryObj } from '@storybook/react';

import DropdownButton from './dropdown-button';

const meta: Meta<typeof DropdownButton> = {
  title: 'Common/DropdownButton',
  component: DropdownButton,
  parameters: {
    componentSubtitle: '드롭다운 버튼 컴포넌트',
    layout: 'centered',
    docs: {
      description: {
        component:
          'DropdownButton은 페스티벌 추가 또는 삭제 옵션을 표시하는 Kebab 버튼 컴포넌트입니다.\n\n' +
          '1. **isActive**: 버튼이 활성화된 상태인지 여부를 나타냅니다.\n' +
          '2. **onToggle**: 버튼 클릭 시 활성화 상태를 변경합니다.\n\n',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    isActive: true,
  },
};
