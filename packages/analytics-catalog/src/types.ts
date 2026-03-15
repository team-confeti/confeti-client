export interface AnalyticsCatalogParam {
  name: string;
  type: string;
  required: boolean;
}

export interface AnalyticsCatalogRow {
  page: string;
  path: string;
  state: string;
  attribute: string;
  commonComponent: string;
  element: string;
  eventType: 'click' | 'show';
  eventName: string;
  showType: '' | 'page' | 'component';
  params: AnalyticsCatalogParam[];
  sourceFile: string;
  sourceComponent: string;
  sourceLine: number;
}

export interface AnalyticsCatalogData {
  generatedAt: string;
  rows: AnalyticsCatalogRow[];
}
