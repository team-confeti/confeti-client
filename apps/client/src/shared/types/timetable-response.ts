export interface UserTimetable {
  userTimetableId: number;
  isSelected: boolean;
}

export interface UserTimetableResponse {
  userTimetables: UserTimetable[];
}
