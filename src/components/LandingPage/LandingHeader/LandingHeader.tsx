import { UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import classes from './LandingHeader.module.css';

export function LandingHeader() {
  const { user, logout } = useAuth();

  return (
    <header className={classes.header}>
      {user ? (
        <UnstyledButton className={classes.loginButton} onClick={logout}>Log out</UnstyledButton>
      ) : (
        <UnstyledButton component={Link} to='/login' className={classes.loginButton}>Log in / Sign up</UnstyledButton>
      )}
    </header>
  );
}
