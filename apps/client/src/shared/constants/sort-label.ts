export const enum SORT_OPTIONS {
  RECENT = 'createdAt',
  OLDEST = 'oldestFirst',
  ALPHABETICAL = 'alphabetically',
}

export type SortOption =
  | SORT_OPTIONS.RECENT
  | SORT_OPTIONS.OLDEST
  | SORT_OPTIONS.ALPHABETICAL;

export const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.RECENT]: '최근추가순',
  [SORT_OPTIONS.OLDEST]: '오래된순',
  [SORT_OPTIONS.ALPHABETICAL]: '가나다순',
};
