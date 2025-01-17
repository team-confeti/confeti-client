export const generateTableRow = (startTime: number) => {
  return Array.from({ length: 24 - startTime }, (_, idx) => startTime + idx);
};

export const parseTimeString = (timeString: string): number[] => {
  return timeString.slice(0, 5).split(':').map(Number);
};

export const calcPosition = (totalMin: number, minutesFromOpen: number) => {
  const top = (minutesFromOpen / 5) * 0.74;
  const diff = (totalMin / 5) * 0.74;
  return { top, diff };
};

export const calcTotalMinutes = (
  startHour: number,
  startMin: number,
  endHour: number,
  endMin: number,
) => {
  return endHour * 60 + endMin - (startHour * 60 + startMin);
};

export const calcMinutesFromOpen = (
  startHour: number,
  startMin: number,
  openHour: number,
  openMin: number,
) => {
  const startTotalMin = startHour * 60 + startMin;
  const openTotalMin = openHour * 60 + openMin;
  return startTotalMin - openTotalMin;
};
