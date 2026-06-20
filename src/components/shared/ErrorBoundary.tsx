import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center h="100vh">
          <Stack align="center" gap="md" maw={400} ta="center">
            <Title order={2} ff="heading" c="neonCyan.6">
              Something went wrong
            </Title>
            <Text c="dimmed" size="sm">
              An unexpected error occurred. Try reloading the page — if it keeps happening, come back later.
            </Text>
            <Group gap="sm">
              <Button variant="filled" color="neonCyan" ff="heading" onClick={() => window.location.reload()}>
                Reload
              </Button>
              <Button variant="subtle" color="gray" ff="heading" onClick={() => { window.location.href = '/'; }}>
                Go home
              </Button>
            </Group>
          </Stack>
        </Center>
      );
    }

    return this.props.children;
  }
}
