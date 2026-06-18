import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { Box, Button, Center, Loader, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import { LeagueChat } from '@/features/chat/LeagueChat';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { League } from '@/types/league';
import classes from './LeagueChat.page.module.css';

interface LeagueChatPageProps {
  mode: 'ACADEMIC' | 'HOMIES';
}

export default function LeagueChatPage({ mode }: LeagueChatPageProps) {
  const { id } = useParams<{ id: string }>();
  const leagueId = Number(id);
  const { user } = useAuth();

  const mainColor = mode === 'ACADEMIC' ? 'neonCyan.6' : 'neonMagenta.3';
  const buttonColor = mode === 'ACADEMIC' ? 'neonCyan' : 'neonMagenta';
  const leaguesPath = mode === 'ACADEMIC' ? '/academics/leagues' : '/activities/leagues';

  const {
    data: league,
    isLoading: leagueLoading,
    isError: leagueError,
  } = useQuery<League, ApiError>({
    queryKey: ['league', leagueId],
    queryFn: () => apiFetch<League>(`/api/leagues/${leagueId}`),
    enabled: !isNaN(leagueId),
  });

  const { data: myLeagues = [], isLoading: membershipLoading } = useQuery<League[]>({
    queryKey: ['leagues', 'me'],
    queryFn: () => apiFetch<League[]>('/api/leagues/me'),
    enabled: !!user,
  });

  if (isNaN(leagueId)) {
    return (
      <Box className={classes.notMember}>
        <Text c="red">Invalid league ID.</Text>
        <Button component={Link} to={leaguesPath} variant="outline" color={buttonColor} ff="heading">
          Back to Leagues
        </Button>
      </Box>
    );
  }

  if (leagueLoading || membershipLoading) {
    return (
      <Center style={{ flex: 1, minHeight: 300 }}>
        <Loader color={mainColor} />
      </Center>
    );
  }

  if (leagueError || !league) {
    return (
      <Box className={classes.notMember}>
        <Text c="dimmed">League not found.</Text>
        <Button component={Link} to={leaguesPath} variant="outline" color={buttonColor} ff="heading">
          Back to Leagues
        </Button>
      </Box>
    );
  }

  const isMember = myLeagues.some((l) => l.id === leagueId);

  if (!isMember) {
    return (
      <Box className={classes.notMember}>
        <Title order={3} ff="heading" c={mainColor}>
          {league.name}
        </Title>
        <Text c="dimmed" size="sm">
          You're not a member of this league.
        </Text>
        <Button
          component={Link}
          to={leaguesPath}
          variant="outline"
          color={buttonColor}
          ff="heading"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Leagues
        </Button>
      </Box>
    );
  }

  return (
    <Box className={classes.page}>
      <LeagueChat leagueId={leagueId} leagueName={league.name} mode={mode} />
    </Box>
  );
}
