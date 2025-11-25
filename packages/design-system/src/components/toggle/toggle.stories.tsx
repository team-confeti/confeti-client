import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Toggle from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Common/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'on/off 상태를 전환할 때 사용하는 토글 컴포넌트',
    docs: {
      description: {
        component:
          'Toggle 컴포넌트는 설정이나 옵션의 on/off 상태를 전환할 때 사용해요. \n\n' +
          '1. **checked**: 토글의 on/off 상태를 나타내요. (true: on, false: off)\n' +
          '2. **onChange**: 토글 상태가 변경될 때 호출되는 콜백 함수예요.\n' +
          '3. **disabled**: 토글을 비활성화할지 여부를 설정해요.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: '토글의 on/off 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '토글 비활성화 여부',
    },
    onChange: {
      description: '상태 변경 시 호출되는 콜백 함수',
      table: { disable: true },
    },
  },
  args: {
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

const ToggleTemplate = (args: React.ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = useState(args.checked);

  useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: (args) => <ToggleTemplate {...args} />,
  args: {
    checked: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 상태의 Toggle 컴포넌트입니다. 클릭하여 상태를 전환할 수 있습니다.',
      },
    },
  },
};

export const Checked: Story = {
  render: (args) => <ToggleTemplate {...args} />,
  args: {
    checked: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '체크된 상태의 Toggle 컴포넌트입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => <ToggleTemplate {...args} />,
  args: {
    checked: false,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 상태의 Toggle 컴포넌트입니다. 상호작용이 불가능합니다.',
      },
    },
  },
};
