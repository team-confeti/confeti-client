import type { Meta, StoryObj } from '@storybook/react';

import {
  BtnMeatball,
  IcTimetableAddfestival,
  IcTimetableDeletefestival,
} from '../../icons/src';
import DropdownMenu from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Common/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DropdownMenu 컴포넌트는 사용자가 선택할 수 있는 여러 항목 목록을 제공하는 컴포넌트입니다. \n\n' +
          '- Root: 드롭다운 컨텍스트 제공, 외부 클릭 시 자동으로 닫힘 \n\n' +
          '- Trigger: 드롭다운을 여닫는 버튼 요소 \n\n' +
          '- Content: 드롭다운 메뉴 컨테이너 \n\n' +
          '- Item: 개별 메뉴 항목 \n\n',
      },
    },
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ height: '20rem' }}>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <BtnMeatball width={'2.4rem'} height={'2.4rem'} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item label="페스티벌 추가하기">
            <IcTimetableAddfestival width={'2rem'} height={'2rem'} />
          </DropdownMenu.Item>

          <DropdownMenu.Item label="페스티벌 삭제하기">
            <IcTimetableDeletefestival width={'2rem'} height={'2rem'} />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};
