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
    const { pathname } = location;
    let redirectPath = '/my/require-login';

    switch (true) {
      case pathname.startsWith('/timetable'):
        redirectPath = '/timetable/require-login';
        break;
      case pathname.startsWith('/my-history'):
        redirectPath = '/my-history/require-login';
        break;
      default:
        redirectPath = '/my/require-login';
    }

    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
export const createProtectedRoute = (
  protect: boolean,
  Component: ReactNode,
) => <ProtectedRoute protect={protect}>{Component}</ProtectedRoute>;
