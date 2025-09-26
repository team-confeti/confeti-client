import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DotIndicator from './dot-indicator';

const meta: Meta<typeof DotIndicator> = {
  title: 'Common/Indicator/DotIndicator',
  component: DotIndicator,
  parameters: {
    layout: 'centered',
    componentSubtitle: '현재 위치를 나타내는 점(dot) 인디케이터 컴포넌트',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#43444B',
        },
      ],
    },
    docs: {
      description: {
        component:
          'DotIndicator 컴포넌트는 캐러셀이나 페이지네이션에서 현재 위치를 나타내는 점(dot)요소로 나타내요. \n\n' +
          '1. **total**: 전체 항목의 개수를 설정해요.\n' +
          '2. **current**: 현재 활성화된 항목의 인덱스를 설정해요. (0부터 시작)\n' +
          '3. **onDotClick**: dot 클릭 시 호출되는 콜백 함수예요.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    total: 5,
    current: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveWrapper = ({
  total,
  initialCurrent = 0,
}: {
  total: number;
  initialCurrent?: number;
}) => {
  const [current, setCurrent] = useState(initialCurrent);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div>
      <DotIndicator
        total={total}
        current={current}
        onDotClick={handleDotClick}
      />
      <div style={{ marginTop: '12rem', color: 'white', textAlign: 'center' }}>
        Current: {current}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    total: 5,
    current: 0,
  },
};

export const Interactive: Story = {
  render: () => <InteractiveWrapper total={5} initialCurrent={0} />,
  parameters: {
    docs: {
      description: {
        story:
          'dot을 클릭하여 활성 상태를 변경할 수 있습니다. 현재 인덱스가 하단에 표시됩니다.',
      },
    },
  },
};

export const InteractiveThreeItems: Story = {
  render: () => <InteractiveWrapper total={3} initialCurrent={1} />,
  parameters: {
    docs: {
      description: {
        story: '3개 항목의 인터랙티브 인디케이터입니다.',
      },
    },
  },
};

export const StaticStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'white', marginBottom: '0.5rem' }}>
          First Active
        </div>
        <DotIndicator total={5} current={0} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'white', marginBottom: '0.5rem' }}>
          Middle Active
        </div>
        <DotIndicator total={5} current={2} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'white', marginBottom: '0.5rem' }}>
          Last Active
        </div>
        <DotIndicator total={5} current={4} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 정적 상태를 보여주는 인디케이터입니다.',
      },
    },
  },
};
