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
  totalCount: number;
  setlists: MyHistorySetList[];
}

export interface MyHistoryRecord {
  totalCount: number;
  timetableCount: number;
  setlistCount: number;
}

export interface SetListPerformance {
  performanceId: number;
  title: string;
  posterUrl: string;
  type: 'FESTIVAL' | 'CONCERT';
  typeId: number;
}

export interface SetListPerformanceResponse {
  performanceCount: number;
  performances: SetListPerformance[];
}

export interface SetListPerformanceRequest {
  pid: number | null;
  aid: string | null;
  term: string | null;
}

export interface SetListMusic {
  musicId: number;
  trackId: string;
  artistName: string;
  trackName: string;
  artworkUrl: string;
  previewUrl: string;
  orders: number;
}

export interface SetListDetail {
  setlistId: number;
  type: 'FESTIVAL' | 'CONCERT';
  typeId: number;
  posterUrl: string;
  posterBgUrl: string;
  title: string;
  subTitle: string;
  startAt: string;
  endAt: string;
  musics: SetListMusic[];
}
