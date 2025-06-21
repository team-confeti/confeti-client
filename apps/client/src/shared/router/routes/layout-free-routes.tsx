import { OnboardingPage } from '../lazy';
import { routePath } from '../path';

export const layoutFreeRoutes = [
  {
    path: routePath.ONBOARDING,
    element: <OnboardingPage />,
  },
];
