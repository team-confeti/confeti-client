export const SORT_OPTIONS = {
  RECENT: 'createdAt',
  OLDEST: 'oldestFirst',
  ALPHABETICAL: 'alphabetically',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.RECENT]: '최근추가순',
  [SORT_OPTIONS.OLDEST]: '오래된순',
  [SORT_OPTIONS.ALPHABETICAL]: '가나다순',
};
