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
Chip은 항목을 설명하는 키워드를 사용하여 항목에 레이블을 지정하거나 분류하거나 구성합니다.
사용자는 정보를 입력하고 선택하고 콘텐츠를 필터링하거나 작업을 트리거할 수 있습니다.

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
        story: '선택된 상태의 Choice Chip입니다.',
      },
    },
  },
};

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
          'Assist Chip은 부가적인 정보를 표시할 때 사용됩니다. 선택/삭제 기능이 없는 정보 전달 목적의 컴포넌트입니다.',
      },
    },
  },
};
