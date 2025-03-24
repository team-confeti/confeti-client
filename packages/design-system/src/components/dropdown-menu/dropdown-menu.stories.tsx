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
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div>
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
