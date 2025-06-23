import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './search-bar';

const meta: Meta<typeof SearchBar> = {
  title: 'Common/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SearchBar 컴포넌트는 검색 입력을 위한 UI 요소입니다.

- **value**: 입력된 텍스트 값
- **onChange**: 입력값 변경 시 호출되는 이벤트 핸들러
- **onKeyDown, onKeyUp**: 키보드 이벤트 핸들러
- **onFocus, onBlur**: 포커스 이벤트 핸들러
- **onClear**: 입력 초기화 버튼 클릭 시 호출
- **showBackButton**: 뒤로 가기 버튼 노출 여부 (기본: true)
- **placeholder**: 입력창에 표시될 플레이스홀더 텍스트
- **autoFocus**: 마운트 시 자동 포커스 여부
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            width: '100%',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: 'text',
      description: '검색 입력값',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 시 호출',
      table: {
        type: { summary: '(e: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'key down',
      description: '키보드 키 누름 이벤트',
      table: {
        type: { summary: '(e: React.KeyboardEvent<HTMLInputElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'key up',
      description: '키보드 키 뗌 이벤트',
      table: {
        type: { summary: '(e: React.KeyboardEvent<HTMLInputElement>) => void' },
      },
    },
    onFocus: {
      action: 'focused',
      description: '입력창 포커스 시 호출',
      table: {
        type: { summary: '() => void' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: '입력창 블러 처리 시 호출',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClear: {
      action: 'cleared',
      description: '입력 초기화 버튼 클릭 시 호출',
      table: {
        type: { summary: '() => void' },
      },
    },
    showBackButton: {
      control: 'boolean',
      description: '뒤로가기 버튼 표시 여부',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    placeholder: {
      control: 'text',
      description: '입력창 placeholder 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: '자동 포커스 여부',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    showBackButton: true,
  },
};

export const WithoutBackButton: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    showBackButton: false,
  },
};

export const AutoFocus: Story = {
  args: {
    placeholder: '자동 포커스 테스트',
    autoFocus: true,
  },
};

export const WithValue: Story = {
  args: {
    value: '테스트 검색어',
    placeholder: '검색어를 입력하세요',
  },
};
