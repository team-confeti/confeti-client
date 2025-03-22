import type { Meta, StoryObj } from '@storybook/react';

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
        <DropdownMenu.Trigger>aa</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item label="페스티벌 추가하기" />
          <DropdownMenu.Item label="페스티벌 삭제하기" />
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};
