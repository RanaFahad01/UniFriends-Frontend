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

    const destination = user.isNewUser ? '/onboarding' : '/academics/posts';

    // Preload the avatar image before navigating so the browser has it cached
    // by the time UserControls mounts. Without this, Avatar shows the fallback
    // placeholder on first login because the image hasn't been fetched yet.
    if (user.avatarUrl) {
      const img = new Image();
      img.onload = () => navigate(destination, { replace: true });
      img.onerror = () => navigate(destination, { replace: true });
      img.src = user.avatarUrl;
    } else {
      navigate(destination, { replace: true });
    }
  }, [isLoading, user, navigate]);

  return (
    <Center h="100vh">
      <Loader color="neonCyan" />
    </Center>
  );
}
