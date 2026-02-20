export interface TimeBlock {
  timeBlockId: number;
  isSelected: boolean;
}

export interface TimeBlockResponse {
  timeBlocks: TimeBlock[];
}
