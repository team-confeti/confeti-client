export type NavigateParams = { isReTry: boolean };

export interface WithNavigate {
  handleNavigate: (params: NavigateParams) => void;
}

export interface WithNextStep {
  handleNextStep: VoidFunction;
}

export interface WithIndex {
  totalIndex: number;
  currentIndex: number;
}
