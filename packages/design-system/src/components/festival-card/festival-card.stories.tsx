import type { Meta, StoryObj } from '@storybook/react';

import FestivalCard from './festival-card';

const meta: Meta<typeof FestivalCard> = {
  title: 'Common/Card/FestivalCard',
  component: FestivalCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
\`FestivalCard\` 컴포넌트는 페스티벌, 콘서트, 아티스트 등 다양한 공연 정보를 카드 형태로 표시합니다.

- \`title\`: 카드 하단에 표시되는 제목
- \`imageSrc\`: 카드 이미지 (기본 이미지 제공)
- \`isSelected\`: 선택 상태 여부
- \`selectable\`: 선택 가능한 카드인지 여부
- \`onSelectChange\`: 선택 상태가 변경될 때 호출되는 콜백

\`selectable\`이 true일 경우, 클릭 시 선택 상태가 토글되며 아이콘이 표시됩니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '10rem', height: '14rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    title: '오로라 내한 공연',
    imageSrc: 'https://i.imgur.com/DwH8XUo.png',
  },
  argTypes: {
    title: { control: 'text' },
    imageSrc: { control: 'text' },
    isSelected: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FestivalCard>;

export const Default: Story = {
  name: 'Default',
};

export const Selectable: Story = {
  name: 'Selectable',
  args: {
    selectable: true,
  },
};

export const Preselected: Story = {
  name: 'Preselected',
  args: {
    selectable: true,
    isSelected: true,
  },
};
