export interface Performance {
  performanceId: number;
  type: 'concert' | 'festival';
  title: string;
  posterUrl: string;
}

export interface Performances {
  map(
    arg0: (confeti: Performance) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode;
  performances: Performance[];
}
