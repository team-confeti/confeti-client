import { USER_ID, USER_ID_KEY } from '@shared/constants/user-constants';
import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  protect?: boolean;
  children?: ReactNode;
}

export const ProtectedRoute = ({
  protect = false,
  children,
}: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem(USER_ID_KEY) === USER_ID;

  if (protect && !isLoggedIn) {
    return <Navigate to="/my/require-login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

// 래핑 유틸리티 함수
export const createProtectedRoute = (
  protect: boolean,
  Component: ReactNode,
) => <ProtectedRoute protect={protect}>{Component}</ProtectedRoute>;
