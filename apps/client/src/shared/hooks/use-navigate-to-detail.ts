import { useNavigate } from 'react-router-dom';

import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

export const useNavigateToDetail = () => {
  const navigate = useNavigate();

  return (type: string, typeId: number) => {
    const upperType = type.toUpperCase();

    switch (upperType) {
      case 'CONCERT':
        navigate(
          buildPath(routePath.CONCERT_DETAIL, { typeId: String(typeId) }),
        );
        break;

      case 'FESTIVAL':
        navigate(
          buildPath(routePath.FESTIVAL_DETAIL, { typeId: String(typeId) }),
        );
        break;

      default:
        console.warn(`Unknown detail type: ${type}`);
        break;
    }
  };
};
