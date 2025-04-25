import { Performances } from './performance-response';

export type MyTimeTable = Pick<Performances, 'typeId' | 'posterUrl' | 'title'>;

export interface MyHistoryTimetableResponse {
  timetableCount: number;
  timetables: MyTimeTable[];
}

export interface MyHistorySetList {
  setlistId: number;
  type: 'FESTIVAL' | 'CONCERT';
  typeId: number;
  title: string;
  posterUrl: string;
  endAt: string;
}

export interface MyHistorySetListResponse {
  setlistCount: number;
  setlists: MyHistorySetList[];
}
