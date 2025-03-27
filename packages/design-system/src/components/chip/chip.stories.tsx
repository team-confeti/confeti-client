import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Chip from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: '기본 칩',
  },
  argTypes: {
    onDelete: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Default Chip',
  },
};

export const Active: Story = {
  args: {
    variant: 'active',
    label: 'Active Chip',
  },
};

const WithDeleteTemplate = (args: React.ComponentProps<typeof Chip>) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [args.label]);

  return visible ? (
    <Chip {...args} onDelete={() => setVisible(false)} />
  ) : (
    <div style={{ padding: '1rem' }}>
      칩이 삭제되었습니다. 다시 보려면 컨트롤을 변경하세요.
    </div>
  );
};

export const WithDelete: Story = {
  render: (args) => <WithDeleteTemplate {...args} />,
  args: {
    variant: 'withDelete',
    label: 'Deletable Chip',
  },
};
