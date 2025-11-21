import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getAccessToken } from '@confeti/core/auth';

interface ProtectedRouteProps {
  protect?: boolean;
  children?: ReactNode;
}

export const ProtectedRoute = ({
  protect = false,
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (protect && !getAccessToken()) {
    const { pathname } = location;

    if (pathname.startsWith('/timetable')) {
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
