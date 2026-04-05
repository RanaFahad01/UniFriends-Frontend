import { Box } from '@mantine/core';
import classes from './BackgroundEffectsMagenta.module.css';

export function BackgroundEffectsMagenta() {
  return (
    <Box className={classes.root}>
      <div className={classes.gradient} />
      <div className={classes.vignette} />
    </Box>
  );
}
