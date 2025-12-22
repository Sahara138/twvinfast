
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hooks";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

interface ProtectedRouteProps {
  role?: UserRole;
  children: ReactNode;
}

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  // Not logged in
  if (!accessToken || !user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch (if restricted)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}