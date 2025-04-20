import { Meta, StoryObj } from '@storybook/react';

import SearchSuggestionList from './search-suggestion-list';

const meta: Meta<typeof SearchSuggestionList> = {
  title: 'Common/SearchSuggestionList',
  component: SearchSuggestionList,
  parameters: {
    componentSubtitle: '연관 검색어 목록을 렌더링하는 컴포넌트입니다.',
    layout: 'centered',
    docs: {
      description: {
        component:
          'SearchSuggestionList 컴포넌트는 관련 아티스트들의 검색 제안 목록을 렌더링합니다.\n\n' +
          '### Props\n' +
          '- **relatedKeyword**: 아티스트 객체의 배열입니다.\n' +
          '  - `artistId` (string): 고유 식별자\n' +
          '  - `profileUrl` (string): 프로필 이미지 URL (없을 경우 fallback 아이콘 사용)\n' +
          '  - `name` (string): 아티스트 이름\n',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchSuggestionList>;

export const Default: Story = {
  args: {
    relatedKeyword: [
      {
        artistId: '1',
        profileUrl: 'https://i.imgur.com/i3lTe0K.jpeg',
        name: '데이식스',
      },
      {
        artistId: '2',
        profileUrl: 'https://i.imgur.com/JEFuh4T.jpeg',
        name: 'DAY6(Even of Day)',
      },
      {
        artistId: '3',
        profileUrl: '',
        name: 'DAY6',
      },
    ],
  },
};

export const NoProfileImage: Story = {
  args: {
    relatedKeyword: [
      {
        artistId: '1',
        profileUrl: '',
        name: '아티스트 A',
      },
      {
        artistId: '2',
        profileUrl: '',
        name: '아티스트 B',
      },
    ],
  },
};

export const EmptyList: Story = {
  args: {
    relatedKeyword: [],
  },
};

export const SingleItem: Story = {
  args: {
    relatedKeyword: [
      {
        artistId: '1',
        profileUrl: 'https://i.imgur.com/i3lTe0K.jpeg',
        name: '데이식스',
      },
    ],
  },
};
