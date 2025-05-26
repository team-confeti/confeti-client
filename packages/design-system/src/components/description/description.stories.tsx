import { Meta, StoryObj } from '@storybook/react';

import Description from './description';

// ✅ Description.Text에 대해 명확하게 타입 지정
const meta: Meta<typeof Description.Text> = {
  title: 'Common/Description',
  component: Description.Text,
  parameters: {
    componentSubtitle: '여러 줄의 설명 텍스트를 렌더링하는 컴포넌트입니다.',
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compound Component Pattern을 사용하여 설명 텍스트와 강조 텍스트를 명확하게 분리합니다.\n\n' +
          '### 사용법\n' +
          '- `Description.Text`: 일반 텍스트 렌더링\n' +
          '- `Description.HighlightedText`: 강조 텍스트 렌더링\n\n' +
          '텍스트를 조합하여 유연하게 구성할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Description.Text>;

export const Default: Story = {
  render: () => (
    <Description.Text
      fontSize={20}
      descriptionText="선호하는 아티스트를 모두 선택해주세요"
    />
  ),
};

export const FontSize18: Story = {
  render: () => (
    <Description.Text fontSize={18} descriptionText="이건 18px로 표시돼요" />
  ),
};

export const WithHighlightedText: Story = {
  render: () => (
    <Description.Text fontSize={20} descriptionText="당신의">
      <Description.HighlightedText fontSize={20} highlightedText="선택" />
      <Description.Text fontSize={20} descriptionText="을 기다리고 있어요" />
    </Description.Text>
  ),
};

export const MultiLineComposition: Story = {
  render: () => (
    <>
      <Description.Text
        fontSize={20}
        descriptionText="이건 여러 줄로 구성된 설명입니다."
      />
      <Description.Text
        fontSize={20}
        descriptionText="폰트 크기는 20px입니다."
      />
    </>
  ),
};
