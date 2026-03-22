import { useNavigate } from 'react-router-dom';

import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

export const useNavigateToDetail = () => {
  const navigate = useNavigate();

  return (type: string, typeId: number) => {
    const upperType = type.toUpperCase();

    switch (upperType) {
      case 'CONCERT': {
        const concertId = typeId;

        navigate(buildPath(routePath.CONCERT_DETAIL, { concertId }));
        break;
      }

      case 'FESTIVAL': {
        const festivalId = typeId;

        navigate(buildPath(routePath.FESTIVAL_DETAIL, { festivalId }));
        break;
      }

      default:
        console.warn(`Unknown detail type: ${type}`);
        break;
    }
  };
};
