import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router";

interface GuestRouteProps {
  children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  if (accessToken && user) {
    // Redirect based on role
    switch (user.role) {
      case "SUPER_ADMIN":
        return <Navigate to="/super-admin" replace />;
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "USER":
        return <Navigate to="/user" replace />;
      default:
        return <Navigate to="/" replace />; // fallback
    }
  }

  // If not logged in, render guest routes
  return <>{children}</>;
}
