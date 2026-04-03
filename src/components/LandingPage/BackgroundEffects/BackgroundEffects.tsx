import { Box } from '@mantine/core';
import classes from './BackgroundEffects.module.css';

export function BackgroundEffects() {
  return (
    <Box className={classes.root}>
      <div className={classes.gradient} />
      <div className={classes.vignette} />
    </Box>
  );
}
