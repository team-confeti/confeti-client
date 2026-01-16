export const calculateDDay = (festivalDate: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(festivalDate);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `D-${diffDays}`;
  } else if (diffDays === 0) {
    return 'D-DAY';
  } else {
    return '종료';
  }
};
