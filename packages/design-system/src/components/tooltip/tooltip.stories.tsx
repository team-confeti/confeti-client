import type { Meta, StoryObj } from '@storybook/react';

import Button from '../button/button';
import Tooltip from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    componentSubtitle: '추가 정보를 표시하는 툴팁 컴포넌트',
    docs: {
      description: {
        component:
          'Tooltip 컴포넌트는 사용자에게 추가 정보를 말풍선 모양으로 제공해요. \n\n' +
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
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: '툴팁 꼬리의 위치',
    },
    animated: {
      control: { type: 'boolean' },
      description: '플로팅 애니메이션 활성화 여부',
    },
  },
  args: {
    trigger: 'hover',
    position: 'top',
    tailPosition: 'bottom-right',
    animated: false,
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: '6rem', display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        {args.trigger !== 'none' && (
          <Tooltip.Trigger asChild>
            <Button text="Tooltip Trigger" variant="default" />
          </Tooltip.Trigger>
        )}
        <Tooltip.Content>Tooltip Content</Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const ClickToTrigger: Story = {
  render: () => (
    <Tooltip trigger="click">
      <Tooltip.Trigger asChild>
        <Button text="Click me" variant="default" />
      </Tooltip.Trigger>
      <Tooltip.Content>클릭하면 나타나요</Tooltip.Content>
    </Tooltip>
  ),
};

export const HoverToTrigger: Story = {
  render: () => (
    <Tooltip trigger="hover">
      <Tooltip.Trigger asChild>
        <Button text="Hover me" variant="default" />
      </Tooltip.Trigger>
      <Tooltip.Content>호버하면 나타나요</Tooltip.Content>
    </Tooltip>
  ),
};

export const AlwaysVisible: Story = {
  render: () => (
    <Tooltip trigger="none" position="top" tailPosition="bottom-right">
      <Tooltip.Content>공연 예매가 다가오고 있어요!</Tooltip.Content>
    </Tooltip>
  ),
};

export const AlwaysVisibleWithAnimated: Story = {
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
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        padding: '10rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6rem',
        fontSize: '1.4rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <h3 style={{ fontSize: '1.6rem' }}>
          Top Position (툴팁이 위쪽에 표시)
        </h3>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Tooltip trigger="none" position="top" tailPosition="bottom-left">
              <Tooltip.Content>좌하단 꼬리</Tooltip.Content>
            </Tooltip>
            <span>bottom-left</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Tooltip trigger="none" position="top" tailPosition="bottom-right">
              <Tooltip.Content>우하단 꼬리</Tooltip.Content>
            </Tooltip>
            <span>bottom-right</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <h3 style={{ fontSize: '1.6rem' }}>
          Bottom Position (툴팁이 아래쪽에 표시)
        </h3>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>top-left</span>
            <Tooltip trigger="none" position="bottom" tailPosition="top-left">
              <Tooltip.Content>좌상단 꼬리</Tooltip.Content>
            </Tooltip>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>top-right</span>
            <Tooltip trigger="none" position="bottom" tailPosition="top-right">
              <Tooltip.Content>우상단 꼬리</Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모든 말꼬리 위치 옵션을 보여주는 예시입니다. tailPosition은 말꼬리의 위치만 변경하고 전체 레이아웃은 변경하지 않습니다.',
      },
    },
  },
};
