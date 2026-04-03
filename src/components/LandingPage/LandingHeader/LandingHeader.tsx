import { UnstyledButton } from '@mantine/core';
import classes from './LandingHeader.module.css';

export function LandingHeader() {
  return (
    <header className={classes.header}>
      <UnstyledButton className={classes.loginButton}>Log in</UnstyledButton>
      <UnstyledButton className={classes.signupButton}>Sign up</UnstyledButton>
    </header>
  );
}
