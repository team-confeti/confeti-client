import { useState } from 'react';

import { Header } from '@confeti/design-system';

const DeleteFestivalPage = () => {
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const handleDeleteFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) => [...prev, festivalId]);
  };

  return (
    <div>
      <Header variant="detail" title="페스티벌 삭제하기" />
    </div>
  );
};

export default DeleteFestivalPage;
