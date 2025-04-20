import { useNavigate } from 'react-router-dom';

export const useNavigateToDetail = () => {
  const navigate = useNavigate();

  return (type: string, typeId: number) => {
    switch (type) {
      case 'CONCERT':
        navigate(`/concert-detail/${typeId}`);
        break;
      case 'FESTIVAL':
        navigate(`/festival-detail/${typeId}`);
        break;
      default:
        console.warn(`Unknown type: ${type}`);
        break;
    }
  };
};
