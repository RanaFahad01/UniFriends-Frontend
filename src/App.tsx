import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { AuthProvider } from './store/AuthContext';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme='dark'>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MantineProvider>
  );
}
