const RECENT_VIEW_KEY = 'recentView';

interface RecentViewItem {
  type: 'concert' | 'festival';
  typeId: number;
}

export const addRecentViewItem = (item: RecentViewItem) => {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(RECENT_VIEW_KEY);
  const parsed: RecentViewItem[] = stored ? JSON.parse(stored) : [];

  const filtered = parsed.filter(
    (i) => !(i.type === item.type && i.typeId === item.typeId),
  );

  const updated = [item, ...filtered];

  localStorage.setItem(RECENT_VIEW_KEY, JSON.stringify(updated));
};

export const getRecentViewItems = (): RecentViewItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(RECENT_VIEW_KEY);
  return stored ? JSON.parse(stored) : [];
};
