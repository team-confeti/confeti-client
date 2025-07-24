import RedirectKakao from '@pages/auth/page/redirect-kakao';

import { LoginPage } from '../lazy';
import { routePath } from '../path';

export const authRoutes = [
  {
    path: routePath.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routePath.REDIRECT_KAKAO,
    element: <RedirectKakao />,
  },
];
