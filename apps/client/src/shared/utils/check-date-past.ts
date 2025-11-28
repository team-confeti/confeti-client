export const isDatePast = (dateString: string): boolean => {
  const targetDate = new Date(dateString);
  const currentDate = new Date();
  return targetDate < currentDate;
};
