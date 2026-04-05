import { UnstyledButton } from '@mantine/core';
import classes from './LandingHeader.module.css';

export function LandingHeader() {
  return (
    <header className={classes.header}>
      <UnstyledButton className={classes.loginButton}>Log in / Sign up</UnstyledButton>

      {/* Signup commented out for now since both were going to lead to the same oauth page anyway */}
      {/* <UnstyledButton className={classes.signupButton}>Sign up</UnstyledButton> */}
    </header>
  );
}
