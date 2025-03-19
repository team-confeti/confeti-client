import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

interface ProtectedRouteProps {
  protect?: boolean;
  children?: ReactNode;
}

export const ProtectedRoute = ({
  protect = false,
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (protect && checkIsNotLoggedIn()) {
    if (location.pathname.startsWith('/timetable')) {
      return <Navigate to="/timetable/require-login" replace />;
    }
    return <Navigate to="/my/require-login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export const createProtectedRoute = (
  protect: boolean,
  Component: ReactNode,
) => <ProtectedRoute protect={protect}>{Component}</ProtectedRoute>;
