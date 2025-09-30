import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Chip from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Chip 컴포넌트는 정보를 표시하거나, 사용자의 선택/입력을 보조하기 위해 사용됩니다.
타입은 Choice / Input / Assist 세 가지로 나뉘며, 각 타입은 다른 목적에 맞게 설계되었습니다.

- **Choice Chip**: 여러 선택 옵션중에 1개를 선택하여 해당 선택한 결과값만 노출할 때 사용합니다.
- **Input Chip**: 사용자가 입력하거나 추가한 항목을 나타내며, 삭제가 가능합니다.
- **Assist Chip**: 보조 정보(카테고리, 상태, 태그 등)를 표시할 때 사용합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onDelete: { table: { disable: true } },
    selected: { control: 'boolean' },
    variant: {
      control: { type: 'radio' },
      options: ['choice', 'input', 'assist'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// --- Choice Chips ---
export const ChoiceDeselected: Story = {
  args: {
    variant: 'choice',
    selected: false,
    children: 'Deselected Chip',
  },
  parameters: {
    docs: {
      description: {
        story:
          '선택되지 않은 상태의 Choice Chip입니다. 사용자가 클릭하면 선택 상태로 전환됩니다.',
      },
    },
  },
};

export const ChoiceSelected: Story = {
  args: {
    variant: 'choice',
    selected: true,
    children: 'Selected Chip',
  },
  parameters: {
    docs: {
      description: {
        story:
          '선택된 상태의 Choice Chip입니다. 보통 필터링이나 탭 전환 등에 사용됩니다.',
      },
    },
  },
};

// --- Input Chip (deletable) ---
const WithDeleteTemplate = (args: React.ComponentProps<typeof Chip>) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [args.children]);

  return visible ? (
    <Chip {...args} onDelete={() => setVisible(false)} />
  ) : (
    <div style={{ padding: '1rem' }}>
      칩이 삭제되었습니다. 다시 보려면 컨트롤을 변경하세요.
    </div>
  );
};

export const Input: Story = {
  render: (args) => <WithDeleteTemplate {...args} />,
  args: {
    variant: 'input',
    children: 'Deletable Chip',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input Chip은 사용자가 추가한 검색어나 태그처럼 삭제 가능한 항목을 나타냅니다. 항상 삭제 아이콘이 포함됩니다.',
      },
    },
  },
};

// --- Assist Chip ---
export const Assist: Story = {
  args: {
    variant: 'assist',
    children: 'Assist Chip',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Assist Chip은 부가적인 정보를 표시할 때 사용됩니다. 선택/삭제 기능 없이 정보 전달 목적입니다.',
      },
    },
  },
};
