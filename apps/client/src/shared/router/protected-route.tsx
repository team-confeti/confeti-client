import { USER_ID, USER_ID_KEY } from '@shared/constants/user-constants';
import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  protect?: boolean;
  children?: ReactNode;
}

export const ProtectedRoute = ({
  protect = false,
  children,
}: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem(USER_ID_KEY) === USER_ID;
  const location = useLocation();

  if (protect && !isLoggedIn) {
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
