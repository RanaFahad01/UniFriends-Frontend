import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { queryClient } from './api/queryClient';
import { Router } from './Router';
import { AuthProvider } from './store/AuthContext';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <Notifications position="top-right" zIndex={1000} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
