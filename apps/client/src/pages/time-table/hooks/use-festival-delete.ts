import { useState } from 'react';
import { useDeleteTimeTableFestival } from '@pages/time-table/hooks/use-timetable-festival-mutation';

export const useFestivalDelete = () => {
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const deleteFestival = useDeleteTimeTableFestival();

  const handleDeleteFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) => [...prev, festivalId]);
  };

  const handleCompleteDelete = async () => {
    try {
      await Promise.all(
        festivalsToDelete.map((festivalId) =>
          deleteFestival.mutateAsync(festivalId),
        ),
      );
      setFestivalsToDelete([]);
      window.location.reload();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    festivalsToDelete,
    handleDeleteFestival,
    handleCompleteDelete,
  };
};
