interface Artist {
  artistId: string;
  artistName: string;
}

interface FestivalTimes {
  timeBlockId: number;
  name: string;
  startAt: string;
  endAt: string;
  isSelected: boolean;
  artists: Artist[];
}

interface Stage {
  stageOrder: number;
  stageName: string;
  festivalTimes: FestivalTimes[];
}

export interface TimetableInfo {
  ticketOpenAt: string;
  stageCount: number;
  stages: Stage[];
}

export interface TimetableInfoType {
  timetableInfo: TimetableInfo;
}
