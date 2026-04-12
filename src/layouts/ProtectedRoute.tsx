import { Navigate, Outlet } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { useAuth } from '@/store/AuthContext';
import type { User } from '@/types/user';

interface Props {
  requiredRole?: User['role'];
}

export function ProtectedRoute({ requiredRole }: Props) {
  const { user, isLoading } = useAuth();

  // Wait for the initial /me call to resolve before making any routing decision.
  // Without this, a page refresh would flash-redirect for like a second to /login before the
  // cookie-based session is confirmed.
  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader color="neonCyan" />
      </Center>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isNewUser) {
    return <Navigate to="/onboarding" replace />;
  }

  // ADMIN passes any role check - they have all permissions.
  if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
