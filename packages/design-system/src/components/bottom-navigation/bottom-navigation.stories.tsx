import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../icons';
import BottomNavigation from './bottom-navigation';

const meta: Meta<typeof BottomNavigation.Root> = {
  title: 'Common/BottomNavigation',
  component: BottomNavigation.Root,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '모바일 하단 탭 내비게이션',
    docs: {
      description: {
        component:
          'BottomNavigation은 하단 탭 내비게이션의 구조·접근성·스타일만 제공하는 프리미티브예요. 아이콘과 라우팅은 소비자가 주입해요.\n\n' +
          '1. **Root**: `value`/`onValueChange`(controlled) 또는 `defaultValue`(uncontrolled)로 active 탭을 관리해요.\n' +
          '2. **Item**: 탭 하나를 나타내요. `children`을 `({ isActive }) => ...`로 주면 active 여부에 따라 아이콘을 바꿀 수 있어요.\n' +
          '3. 키보드(화살표/Home/End)·스크린리더·iOS safe-area를 기본 지원해요.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation.Root>;

const TABS = [
  { value: '/', label: '홈', icon: 'home' },
  { value: '/timetable', label: '타임테이블', icon: 'timetable' },
  { value: '/setlist', label: '셋리스트', icon: 'setlist' },
  { value: '/my', label: '마이페이지', icon: 'mypage' },
] as const;

const PAGES: Record<string, string> = {
  '/': '홈 페이지',
  '/timetable': '타임테이블 페이지',
  '/setlist': '셋리스트 페이지',
  '/my': '마이페이지',
};

const InteractiveExample = () => {
  const [tab, setTab] = useState('/');

  return (
    <BottomNavigation.Root
      value={tab}
      onValueChange={setTab}
      ariaLabel="앱 하단 메뉴"
    >
      {TABS.map(({ value, label, icon }) => (
        <BottomNavigation.Item key={value} value={value} label={label}>
          {({ isActive }) => (
            <Icon
              name={icon}
              weight={isActive ? 'fill' : 'regular'}
              size={24}
            />
          )}
        </BottomNavigation.Item>
      ))}
    </BottomNavigation.Root>
  );
};

export const Default: Story = {
  render: () => <InteractiveExample />,
  parameters: {
    docs: {
      description: {
        story:
          '홈/타임테이블/셋리스트/마이페이지 4탭 예시예요. 현재 경로를 `value`로, 각 탭의 경로를 `Item`의 `value`로 넘기면 둘이 일치하는 탭이 active가 돼요. active 탭은 아이콘이 `weight="fill"`로 바뀌어요.',
      },
    },
  },
};

const WithPagesExample = () => {
  const [tab, setTab] = useState('/');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '32rem' }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          color: '#43444b',
        }}
      >
        {PAGES[tab]}
      </div>
      <BottomNavigation.Root
        value={tab}
        onValueChange={setTab}
        ariaLabel="앱 하단 메뉴"
      >
        {TABS.map(({ value, label, icon }) => (
          <BottomNavigation.Item key={value} value={value} label={label}>
            {({ isActive }) => (
              <Icon
                name={icon}
                weight={isActive ? 'fill' : 'regular'}
                size={24}
              />
            )}
          </BottomNavigation.Item>
        ))}
      </BottomNavigation.Root>
    </div>
  );
};

export const WithPages: Story = {
  render: () => <WithPagesExample />,
  parameters: {
    docs: {
      description: {
        story:
          '탭을 누르면 상단 콘텐츠가 바뀌어요. 앱에서는 이 `value`/`onValueChange` 자리에 라우터의 `pathname`과 페이지 이동을 연결해요.',
      },
    },
  },
};

export const TextOnly: Story = {
  render: () => (
    <BottomNavigation.Root defaultValue="a" ariaLabel="예시 탭">
      <BottomNavigation.Item value="a" label="첫 번째" />
      <BottomNavigation.Item value="b" label="두 번째" />
      <BottomNavigation.Item value="c" label="세 번째" />
      <BottomNavigation.Item value="d" label="네 번째" />
    </BottomNavigation.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘 없이 라벨만으로도 동작해요.',
      },
    },
  },
};
