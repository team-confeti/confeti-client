import { OnboardingPage } from '../lazy';
import { createOnboardingGuard } from '../onboarding-guard';
import { routePath } from '../path';

export const layoutFreeRoutes = [
  {
    path: routePath.ONBOARDING,
    element: createOnboardingGuard(<OnboardingPage />),
  },
];
