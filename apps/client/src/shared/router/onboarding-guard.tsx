import { ReactNode } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';

import { ONBOARD_QUERY_OPTIONS } from '@shared/apis/onboard/queries';

import { routePath } from './path';

interface OnboardingGuardProps {
  children?: ReactNode;
}

export const OnboardingGuard = ({ children }: OnboardingGuardProps) => {
  // const { data: onboardingStatus } = useSuspenseQuery({
  //   ...ONBOARD_QUERY_OPTIONS.STATUS(),
  // });

  // if (onboardingStatus?.onboardStatus === 'COMPLETED') {
  //   return <Navigate to={routePath.ROOT} replace />;
  // }

  return children ? <>{children}</> : <Outlet />;
};

export const createOnboardingGuard = (Component: ReactNode) => (
  <OnboardingGuard>{Component}</OnboardingGuard>
);
