import { Box, Title } from '@mantine/core';
import classes from './HeroSection.module.css';

export function HeroSection() {
  return (
    <div className={classes.section}>
      <Title order={2} className={classes.subtitle}>
        Welcome to
      </Title>
      <Box className={classes.logoBox}>
        <Title order={1} className={classes.logo}>
          Unifriends
        </Title>
      </Box>
    </div>
  );
}
