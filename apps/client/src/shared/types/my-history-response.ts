import { Performances } from './performance-response';

export type MyTimeTable = Pick<
  Performances,
  'typeId' | 'posterUrl' | 'title' | 'type'
>;

export interface MyTimetable {
  timetableFestivalId: number;
  posterUrl: string;
  title: string;
  type: 'FESTIVAL' | 'CONCERT';
  dates: FestivalDate[];
}

export interface FestivalDate {
  festivalDateId: number;
  festivalAt: string;
  dayOfWeek: string;
  displayedDayOfWeek: string;
}

export interface MyHistoryTimetableResponse {
  timetableCount: number;
  timetables: MyTimetable[];
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

export interface MusicSearchRequest {
  term: string;
  offset: number;
  limit: number;
}

export interface MusicSearchResponse {
  nextOffset: number;
  isLast: boolean;
  musics: MusicInfoResponse[];
}

export interface MusicInfoResponse {
  musicId: string;
  trackName: string;
  artistName: string;
  artworkUrl: string;
  previewUrl: string;
}

export interface ArtistMusicSearchRequest {
  aid: string;
  term: string;
  offset: number;
  limit: number;
}

export interface ArtistMusicSearchResponse {
  nextOffset: number;
  isLast: boolean;
  musics: MusicInfoResponse[];
}

export interface SetListMusic {
  musicId: string;
  setlistId: string;
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
  title: string;
  subTitle: string;
  startAt: string;
  endAt: string;
  musics: SetListMusic[];
}

export interface AddMusicToSetListRequest {
  musicId: string;
  artistName: string;
  trackName: string;
  artworkUrl: string;
  previewUrl: string;
}
