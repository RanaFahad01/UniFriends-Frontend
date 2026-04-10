import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { useAuth } from '@/store/AuthContext';

export default function AuthCallback() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      // Cookie was not set or /me call failed, send back to login
      navigate('/login', { replace: true });
      return;
    }

    if (user.isNewUser) {
      navigate('/onboarding', { replace: true });
    } else {
      navigate('/academics/posts', { replace: true });
    }
  }, [isLoading, user, navigate]);

  return (
    <Center h="100vh">
      <Loader color="neonCyan" />
    </Center>
  );
}
