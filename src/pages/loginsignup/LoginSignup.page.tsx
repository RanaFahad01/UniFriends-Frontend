import { Link } from 'react-router-dom';
import { Box, Text, Title } from '@mantine/core';
import { Header } from '@/components/header/Header';
import { BackgroundEffectsCyan } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/landingpage/ScanlineOverlay/ScanlineOverlay';
import { GoogleButton } from '@/components/loginsignup/googlebutton/GoogleButton';
import classes from './LoginSignup.page.module.css';

const handleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/oauth2/authorize/google`;
};

export default function LoginSignup() {
  return (
    <Box className={classes.page}>
      <BackgroundEffectsCyan />
      <ScanlineOverlay />
      <Header />
      <main className={classes.main}>
        <Box className={classes.card}>
          <Title order={2} className={classes.heading}>
            Enter UniFriends
          </Title>
          <div className={classes.accent} />
          <GoogleButton onClick={handleLogin}>Continue with Google</GoogleButton>
          <Text component={Link} to="/privacy-policy" mt={10} size="xs" c="dimmed" td="underline">
            Click here to view our privacy policy
          </Text>
        </Box>
      </main>
    </Box>
  );
}
