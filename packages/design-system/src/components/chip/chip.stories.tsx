import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Chip from './chip';

interface ChipProps {
  label: string;
  variant?: 'home' | 'search';
  isActive?: boolean;
  onDelete?: () => void;
  onScrollToSection?: () => void;
  onActiveChange?: (label: string) => void;
}

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
    onScrollToSection: { table: { disable: true } },
    onActiveChange: { table: { disable: true } },
    isActive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

const HomeTemplate = (args: ChipProps) => {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  useEffect(() => {
    if (args.variant === 'home') {
      setActiveChip(args.isActive ? args.label : null);
    }
  }, [args.isActive, args.label, args.variant]);

  return (
    <Chip
      {...args}
      isActive={args.variant === 'home' ? activeChip === args.label : false}
      onActiveChange={(label) =>
        setActiveChip((prev) => (prev === label ? null : label))
      }
    />
  );
};

export const HomeDefault: Story = {
  render: (args) => <HomeTemplate {...args} />,
  args: {
    variant: 'home',
    isActive: false,
    label: 'Default Chip',
  },
};

export const HomeActive: Story = {
  render: (args) => <HomeTemplate {...args} />,
  args: {
    variant: 'home',
    isActive: true,
    label: 'Active Chip',
  },
};

const SearchTemplate = (args: ChipProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    setVisible(true);
  }, [args.label]);

  return visible ? (
    <Chip {...args} isActive={false} onDelete={() => setVisible(false)} />
  ) : (
    <div style={{ padding: '1rem' }}>
      칩이 삭제되었습니다. 다시 보려면 컨트롤을 변경하세요.
    </div>
  );
};

export const SearchDefault: Story = {
  render: (args) => <SearchTemplate {...args} />,
  args: {
    variant: 'search',
    label: 'Search Chip',
  },
};
