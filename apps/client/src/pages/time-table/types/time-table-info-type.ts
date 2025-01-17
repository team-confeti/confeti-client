interface Artist {
  artistId: string;
  artistName: string;
}

interface FestivalTimes {
  festivalTimeId: number;
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

interface TimeTableInfo {
  ticketOpenAt: string;
  stageCount: number;
  stages: Stage[];
}

export interface TimeTableInfoType {
  timeTableInfo: TimeTableInfo;
}
