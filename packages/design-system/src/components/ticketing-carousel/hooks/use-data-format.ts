import { useMemo } from 'react';

export const useDateFormat = (reserveAt: string) => {
  const formattedDate = useMemo(() => {
    const date = new Date(reserveAt.split('.').join('-'));
    return date.toLocaleDateString();
  }, [reserveAt]);

  const calculateDday = () => {
    const currentDate = new Date();
    const targetDate = new Date(reserveAt.split('-').join('-')); // 같은 형식으로 변환

    // 시간 초기화 (00:00:00)
    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 남은 일수 계산

    return remainingDays <= 0 ? 'DAY' : `${remainingDays}`; // 남은 일수가 0 이하일 경우 "DAY" 반환
  };

  return { formattedDate, dDay: calculateDday() };
};
