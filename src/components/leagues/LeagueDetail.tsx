import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconMessageCircle,
  IconUserMinus,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, Box, Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { apiFetch } from '@/api/client';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { League } from '@/types/league';
import { notifyError, notifySuccess } from '@/utils/notify';

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

  const [leaving, setLeaving] = useState(false);
  const [left, setLeft] = useState(false);

  const { data: myLeagues = [] } = useQuery<League[]>({
    queryKey: ['leagues', 'me'],
    queryFn: () => apiFetch<League[]>('/api/leagues/me'),
    enabled: !!user,
  });

  const isAlreadyMember = myLeagues.some((l) => l.id === league.id);
  const isMember = !left && (isAlreadyMember || joined);

  const chatPath = `/${mode === 'ACADEMIC' ? 'academics' : 'activities'}/leagues/${league.id}/chat`;

  const handleJoin = async () => {
    setJoining(true);
    try {
      await apiFetch<void>(`/api/leagues/${league.id}/join`, { method: 'POST' });
      setJoined(true);
      setLeft(false);
      queryClient.invalidateQueries({ queryKey: ['leagues', mode] });
      queryClient.invalidateQueries({ queryKey: ['leagues', 'me'] });
      notifySuccess('You joined the league!');
    } catch (err) {
      notifyError((err as ApiError).message ?? 'Could not join league. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!user) return;
    setLeaving(true);
    try {
      await apiFetch<void>(`/api/leagues/${league.id}/leave`, { method: 'DELETE' });
      setLeft(true);
      setJoined(false);
      queryClient.invalidateQueries({ queryKey: ['leagues', mode] });
      queryClient.invalidateQueries({ queryKey: ['leagues', 'me'] });
      notifySuccess('You left the league.');
    } catch (err) {
      notifyError((err as ApiError).message ?? 'Could not leave league. Please try again.');
    } finally {
      setLeaving(false);
    }
  };

  return (
    <Stack gap="md">
      <Group gap="md" wrap="nowrap" align="center">
        <Avatar size={64} src={mascotUrl} radius="xl" data-variant={mode} />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Title order={3} ff="heading" style={{ lineHeight: 1.2 }} c={mainColor}>
            {league.name}
          </Title>
          <Group gap={6} mt={4} align="center">
            <IconUsers size={13} color="var(--mantine-color-gray-5)" />
            <Text size="xs" c="gray.5">
              {league.memberCount} {league.memberCount === 1 ? 'member' : 'members'}
            </Text>
          </Group>
        </Box>
      </Group>

      <Divider />

      <Text size="sm" c="gray.3" style={{ lineHeight: 1.7 }}>
        {league.description ?? 'No description provided.'}
      </Text>

      {user && isMember && (
        <Button
          component={Link}
          to={chatPath}
          fullWidth
          variant="filled"
          color={buttonColor}
          ff="heading"
          fz="lg"
          rightSection={<IconMessageCircle size={18} />}
        >
          Go to Chat
        </Button>
      )}

      {user && isMember && (
        <Button
          fullWidth
          variant="outline"
          color="red"
          ff="heading"
          fz="lg"
          rightSection={<IconUserMinus size={18} />}
          loading={leaving}
          onClick={handleLeave}
        >
          Leave League
        </Button>
      )}

      {user && !isMember && (
        <Button
          fullWidth
          variant="outline"
          color={buttonColor}
          ff="heading"
          fz="lg"
          rightSection={<IconUserPlus size={18} />}
          loading={joining}
          onClick={handleJoin}
        >
          Join League
        </Button>
      )}

      {!user && (
        <Button fullWidth variant="subtle" color="gray" ff="heading" fz="lg" disabled>
          Log in to join
        </Button>
      )}
    </Stack>
  );
}
