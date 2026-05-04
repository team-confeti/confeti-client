import RedirectApple from '@pages/auth/page/redirect-apple';
import RedirectKakao from '@pages/auth/page/redirect-kakao';

import { routePath } from '../path';

export const authRoutes = [
  {
    path: routePath.REDIRECT_KAKAO,
    element: <RedirectKakao />,
  },
  {
    path: routePath.REDIRECT_APPLE,
    element: <RedirectApple />,
  },
];
