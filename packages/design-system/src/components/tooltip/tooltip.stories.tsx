import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../icons';
import Button from '../button/button';
import Tooltip from './tooltip';

import * as styles from './tooltip.css';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    componentSubtitle: '추가 정보를 표시하는 툴팁 컴포넌트',
    docs: {
      description: {
        component:
          'Tooltip 컴포넌트는 사용자에게 추가 정보를 제공해요. \n\n' +
          '1. **trigger**: 툴팁이 표시되는 방식을 결정해요. (none: 항상 표시, hover: 마우스 호버, click: 클릭)\n' +
          '2. **position**: 툴팁의 위치를 설정해요.\n' +
          '3. **tailPosition**: 툴팁 꼬리의 위치를 설정해요.\n' +
          '4. **animated**: 플로팅 애니메이션 활성화 여부를 설정해요.\n\n' +
          '**Components:**\n' +
          '- `Tooltip`: 루트 컴포넌트\n' +
          '- `Tooltip.Trigger`: 트리거 요소 (hover/click 시 필요)\n' +
          '- `Tooltip.Content`: 툴팁 내용',
      },
    },
  },
  argTypes: {
    trigger: {
      control: { type: 'radio' },
      options: ['hover', 'click', 'none'],
      description: '툴팁이 표시되는 방식',
    },
    position: {
      control: { type: 'radio' },
      options: ['top', 'bottom'],
      description: '툴팁의 위치',
    },
    tailPosition: {
      control: { type: 'radio' },
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'none'],
      description: '툴팁 꼬리의 위치 (none: 꼬리 없음)',
    },
    animated: {
      control: { type: 'boolean' },
      description: '플로팅 애니메이션 활성화 여부',
    },
  },
  args: {
    trigger: 'none',
    position: 'top',
    tailPosition: 'bottom-left',
    animated: false,
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      {args.trigger !== 'none' && (
        <Tooltip.Trigger asChild>
          <Button text="Tooltip Trigger" variant="default" />
        </Tooltip.Trigger>
      )}
      <Tooltip.Content>Tooltips Content</Tooltip.Content>
    </Tooltip>
  ),
};

export const ClickToTrigger: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Tooltip trigger="click">
        <Tooltip.Trigger asChild>
          <Icon name="toast-info" size="3rem" />
        </Tooltip.Trigger>
        <Tooltip.Content className={styles.tooltipContent}>
          클릭하면 나타나요
        </Tooltip.Content>
      </Tooltip>
      <span style={{ fontSize: '1.4rem' }}>Click ↑</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘을 클릭하면 툴팁이 나타나요.',
      },
    },
  },
};

export const HoverToTrigger: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: '1.4rem' }}>Hover ↓</span>
      <Tooltip trigger="hover" position="bottom" tailPosition="top-left">
        <Tooltip.Trigger asChild>
          <Icon name="toast-info" size="3rem" />
        </Tooltip.Trigger>
        <Tooltip.Content className={styles.tooltipContent}>
          호버하면 나타나요
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘을 호버하면 툴팁이 나타나요.',
      },
    },
  },
};

export const WithoutTrigger: Story = {
  render: () => (
    <Tooltip trigger="none" position="top" tailPosition="bottom-right">
      <Tooltip.Content>공연 예매가 다가오고 있어요!</Tooltip.Content>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: '트리거 없이 항상 나타나는 툴팁이에요.',
      },
    },
  },
};

export const WithAnimated: Story = {
  render: () => (
    <Tooltip
      trigger="none"
      position="top"
      tailPosition="bottom-right"
      animated={true}
    >
      <Tooltip.Content>선호하는 공연 예매가 다가오고 있어요!</Tooltip.Content>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: '플로팅 애니메이션이 활성화된 툴팁이에요.',
      },
    },
  },
};
