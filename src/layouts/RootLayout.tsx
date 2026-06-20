import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavigationProgress } from '@/components/navigationprogress/NavigationProgress';
import { useAuth } from '@/store/AuthContext';

const ONBOARDING_EXEMPT = ['/auth/callback', '/onboarding'];

export function RootLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoading && user?.isNewUser && !ONBOARDING_EXEMPT.includes(pathname)) {
      navigate('/onboarding', { replace: true });
    }
  }, [isLoading, user, pathname, navigate]);

  return (
    <>
      <NavigationProgress />
      <Outlet />
    </>
  );
}
