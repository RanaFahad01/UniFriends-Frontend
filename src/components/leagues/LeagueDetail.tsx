import { useState } from 'react';
import { IconAlertCircle, IconCheck, IconUserPlus, IconUsers } from '@tabler/icons-react';
import { Alert, Avatar, Box, Button, Divider, Group, Text, Title } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { League } from '@/types/league';

interface LeagueDetailProps {
  league: League;
  mascotUrl: string | undefined;
  mode: 'ACADEMIC' | 'HOMIES';
}

export function LeagueDetail({ league, mascotUrl, mode }: LeagueDetailProps) {
  const mainColor = mode === 'ACADEMIC' ? 'neonCyan.6' : 'neonMagenta.3';
  const buttonColor = mode === 'ACADEMIC' ? 'neonCyan' : 'neonMagenta';

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const handleJoin = async () => {
    setJoinError(null);
    setJoining(true);
    try {
      await apiFetch<void>(`/api/leagues/${league.id}/join`, { method: 'POST' });
      setJoined(true);
      // Refresh the leagues list so the member count updates
      queryClient.invalidateQueries({ queryKey: ['leagues', mode] });
    } catch (err) {
      setJoinError((err as ApiError).message ?? 'Could not join league. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <Box>
      <Group gap="lg" wrap="nowrap" align="center" mb="md">
        <Avatar size={72} src={mascotUrl} radius="xl" data-variant={mode} />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Title order={3} ff="heading" style={{ lineHeight: 1.2 }} c={mainColor}>
            {league.name}
          </Title>
          <Group gap={6} mt={6} align="center">
            <IconUsers size={14} color="var(--mantine-color-gray-5)" />
            <Text size="sm" c="gray.5">
              {league.memberCount} {league.memberCount === 1 ? 'member' : 'members'}
            </Text>
          </Group>
        </Box>
      </Group>

      <Divider mb="md" />

      <Text size="sm" c="gray.3" style={{ lineHeight: 1.7 }}>
        {league.description ?? 'No description provided.'}
      </Text>

      {joinError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          color="red"
          variant="light"
          mt="md"
          withCloseButton
          onClose={() => setJoinError(null)}
        >
          {joinError}
        </Alert>
      )}

      {user && (
        <Button
          mt="xl"
          fullWidth
          variant="outline"
          color={joined ? 'green' : buttonColor}
          ff="heading"
          fz="lg"
          rightSection={joined ? <IconCheck size={18} /> : <IconUserPlus size={18} />}
          loading={joining}
          disabled={joined}
          onClick={handleJoin}
        >
          {joined ? 'Joined!' : 'Join League'}
        </Button>
      )}

      {!user && (
        <Button
          mt="xl"
          fullWidth
          variant="subtle"
          color="gray"
          ff="heading"
          fz="lg"
          disabled
        >
          Log in to join
        </Button>
      )}
    </Box>
  );
}
