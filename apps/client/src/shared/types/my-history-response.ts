import { Performances } from './performance-response';

export type MyTimeTable = Pick<Performances, 'typeId' | 'posterUrl' | 'title'>;

export interface MyHistoryResponse {
  timetableCount: number;
  timetables: MyTimeTable[];
}
