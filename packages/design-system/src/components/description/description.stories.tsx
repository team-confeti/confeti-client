import { Meta, StoryObj } from '@storybook/react';

import Description from './description';

const meta: Meta<typeof Description> = {
  title: 'Common/Description',
  component: Description,
  parameters: {
    componentSubtitle: '여러 줄의 설명 텍스트를 렌더링하는 컴포넌트입니다.',
    layout: 'centered',
    docs: {
      description: {
        component:
          'Description 컴포넌트는 여러 줄의 설명을 전달받아 각각의 `<p>` 요소로 렌더링합니다.\n\n' +
          '### Props\n' +
          '- **descriptionText**: string 배열 형태로 각 줄에 표시할 설명 텍스트를 넘겨주세요.\n' +
          '- **fontSize**: `18` 또는 `20` 중 선택하여 글자 크기를 지정할 수 있어요.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    descriptionText: ['선호하는 아티스트를', '모두 선택해주세요'],
    fontSize: 20,
  },
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {
  render: (args) => <Description {...args} />,
};

export const FontSize18: Story = {
  args: {
    descriptionText: ['이건 18px로 표시돼요'],
    fontSize: 18,
  },
};

export const MultiLineText: Story = {
  args: {
    descriptionText: [
      '이건 여러 줄로 구성된 설명입니다.',
      '이렇게 각 줄이 <p> 태그로 구분돼요.',
      '폰트 크기는 20px입니다.',
    ],
    fontSize: 20,
  },
};
