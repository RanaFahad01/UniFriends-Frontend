import { Box } from '@mantine/core';
import classes from './BackgroundEffectsLandingPage.module.css';

export function BackgroundEffectsLandingPage() {
  return (
    <Box className={classes.root}>
      <div className={classes.gradient} />
      <div className={classes.vignette} />
    </Box>
  );
}
