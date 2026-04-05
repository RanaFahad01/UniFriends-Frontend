import { Box } from '@mantine/core';
import classes from './BackgroundEffectsCyan.module.css';

export function BackgroundEffectsCyan() {
  return (
    <Box className={classes.root}>
      <div className={classes.gradient} />
      <div className={classes.vignette} />
    </Box>
  );
}
