import RedirectKakao from '@pages/auth/page/redirect-kakao';

import { LoginPage, OnboardingPage } from '../lazy';
import { routePath } from '../path';

export const authRoutes = [
  {
    path: routePath.ONBOARDING,
    element: <OnboardingPage />,
  },
  {
    path: routePath.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routePath.REDIRECT_KAKAO,
    element: <RedirectKakao />,
  },
];
