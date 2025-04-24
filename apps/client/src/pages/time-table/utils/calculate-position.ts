export interface Position {
  top: string;
  height: string;
  left: string;
  width: string;
  totalPerformMin: number;
}

export const parseTimeString = (time: string): [number, number] => {
  const [hour, min] = time.split(':').map(Number);
  return [hour, min];
};

export const calcTotalMinutes = (
  startHour: number,
  startMin: number,
  endHour: number,
  endMin: number,
): number => {
  const startTotalMin = startHour * 60 + startMin;
  const endTotalMin = endHour * 60 + endMin;
  return endTotalMin - startTotalMin;
};

export const calcMinutesFromOpen = (
  startHour: number,
  startMin: number,
  openHour: number,
  openMin: number,
): number => {
  const startTotalMin = startHour * 60 + startMin;
  const openTotalMin = openHour * 60 + openMin;
  return startTotalMin - openTotalMin;
};

export const calcTotalFestivalMinutes = (
  openHour: number,
  openMin: number,
): number => {
  const closeHour = 24;
  const closeMin = 0;
  return calcTotalMinutes(openHour, openMin, closeHour, closeMin);
};

export const calculateItemPosition = (
  startTime: string,
  endTime: string,
  ticketOpenAt: string,
  stageCount: number,
  stageOrder: number,
): Position => {
  const [startHour, startMin] = parseTimeString(startTime);
  const [endHour, endMin] = parseTimeString(endTime);
  const [openHour, openMin] = parseTimeString(ticketOpenAt);

  const totalPerformMin = calcTotalMinutes(
    startHour,
    startMin,
    endHour,
    endMin,
  );
  const minutesFromOpen = calcMinutesFromOpen(
    startHour,
    startMin,
    openHour,
    openMin,
  );
  const totalFestivalMinutes = calcTotalFestivalMinutes(openHour, openMin);

  const top = `calc(${(minutesFromOpen / totalFestivalMinutes) * 100}% + 0.75rem)`;
  const height = `calc((${totalPerformMin} / ${totalFestivalMinutes}) * 100%)`;
  const left = `calc(2.9rem + ((100% - 2.9rem) / ${stageCount} * ${stageOrder - 1}))`;
  const width = `calc((100% - 3.2rem) / ${stageCount})`;

  return { top, height, left, width, totalPerformMin };
};
