interface Performance {
  performanceAt: string;
}

export const useSortedPerformances = <T extends Performance>(
  performances: T[],
): T[] => {
  const sortedPerformances = [...performances].sort((a, b) => {
    const parseDate = (dateString: string) => {
      const [startDate] = dateString.split(' - ');
      return new Date(startDate.replace(/\./g, '-').trim());
    };

    const dateA = parseDate(a.performanceAt);
    const dateB = parseDate(b.performanceAt);

    return dateA.getTime() - dateB.getTime();
  });

  return sortedPerformances;
};
