import { useEffect } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { Box, Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffectsCyan } from '@/components/LandingPage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/LandingPage/ScanlineOverlay/ScanlineOverlay';
import classes from './NotFound.page.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => { document.title = 'Oops, not found!'; }, []);

  return (
    <Box className={classes.page}>
      <BackgroundEffectsCyan />
      <ScanlineOverlay />
      <Box className={classes.content}>
        <Title className={classes.code} c="neonGold.5">
          404
        </Title>
        <Text className={classes.message} c="gray.4">
          This page doesn't exist.
        </Text>
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="outline"
          color="neonGold"
          ff="heading"
          fz="lg"
          mt="xl"
          onClick={() => navigate('/academics/posts')}
        >
          Back to home
        </Button>
      </Box>
    </Box>
  );
}
