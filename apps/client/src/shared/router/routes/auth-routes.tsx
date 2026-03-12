import RedirectKakao from '@pages/auth/page/redirect-kakao';

import { routePath } from '../path';

export const authRoutes = [
  {
    path: routePath.REDIRECT_KAKAO,
    element: <RedirectKakao />,
  },
];
