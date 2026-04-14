import { useEffect, useState } from 'react';
import { IconAlertCircle, IconUsersGroup } from '@tabler/icons-react';
import { Alert, Box, Button, Center, Group, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '@/api/client';
import LeagueCard from '@/components/leagues/LeagueCard';
import { LeagueDetail } from '@/components/leagues/LeagueDetail';
import { NewLeagueForm } from '@/components/leagues/newleagueform/NewLeagueForm';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { League } from '@/types/league';
import classes from './Leagues.page.module.css';

// Resolve local mascot image URLs at module load time
const academicLoaders = import.meta.glob<string>(
  './leaguemascots/academic/*.{webp,png,jpg,jpeg,svg}',
  { query: '?url', import: 'default' }
);

const homiesLoaders = import.meta.glob<string>(
  './leaguemascots/homies/*.{webp,png,jpg,jpeg,svg}',
  { query: '?url', import: 'default' }
);

function loadersToNameMap(loaders: Record<string, () => Promise<string>>) {
  return Object.fromEntries(
    Object.entries(loaders).map(([path, loader]) => {
      const file = path.split('/').pop()!;
      const name = file.replace(/\.[^/.]+$/, '').replace(/\s+/g, '').toLowerCase();
      return [name, loader] as const;
    })
  ) as Record<string, () => Promise<string>>;
}

const academicByName = loadersToNameMap(academicLoaders);
const homiesByName = loadersToNameMap(homiesLoaders);

interface LeaguesProps {
  mode: 'ACADEMIC' | 'HOMIES';
}

export default function Leagues({ mode }: LeaguesProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load local mascot image URLs
  const [mascots, setMascots] = useState<Record<string, string>>({});

  useEffect(() => {
    const byName = mode === 'ACADEMIC' ? academicByName : homiesByName;
    Promise.all(
      Object.entries(byName).map(async ([name, load]) => [name, await load()] as const)
    ).then((entries) => setMascots(Object.fromEntries(entries)));
  }, [mode]);

  // Fetch leagues from API
  const {
    data: leagues = [],
    isLoading,
    error,
    refetch,
  } = useQuery<League[], ApiError>({
    queryKey: ['leagues', mode],
    queryFn: () => apiFetch<League[]>(`/api/leagues?type=${mode}`),
  });

  const heading = mode === 'ACADEMIC' ? 'Academic Leagues' : 'Extracurricular Leagues';
  const leaguesPageMainColor = mode === 'ACADEMIC' ? 'neonCyan.6' : 'neonMagenta.3';
  const buttonColor = mode === 'ACADEMIC' ? 'neonCyan' : 'neonMagenta';

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  const handleLeagueClick = (league: League) => {
    setSelectedLeague(league);
    openDetail();
  };

  const handleCreateLeague = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    openModal();
  };

  const handleLeagueCreated = () => {
    closeModal();
    refetch();
  };

  return (
    <Box className={classes.page}>
      <Box className={classes.container}>
        <Group align="center" mb="0.5rem">
          <Title order={2} className={classes.heading} c={leaguesPageMainColor}>
            {heading}
          </Title>
          <Button
            rightSection={<IconUsersGroup />}
            variant="outline"
            color={leaguesPageMainColor}
            size="sm"
            ff="heading"
            fz="lg"
            onClick={handleCreateLeague}
          >
            Create League
          </Button>
        </Group>

        <Text c="gray.5" className={classes.description} ta="left">
          Join a league to connect with people who share your interests! Each league has its own
          chat, where you and the homies can share resources, plan meetups and just talk about your
          interests.
        </Text>

        {/* Loading state */}
        {isLoading && (
          <Center mt={50}>
            <Loader color={leaguesPageMainColor} />
          </Center>
        )}

        {/* Error state */}
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" mt="lg">
            {error.message ?? 'Failed to load leagues. Please try again.'}
          </Alert>
        )}

        {/* Empty state */}
        {!isLoading && !error && leagues.length === 0 && (
          <Center mt={50}>
            <Text c="dimmed" size="sm">
              No leagues yet. Create the first one!
            </Text>
          </Center>
        )}

        {/* League grid */}
        {leagues.length > 0 && (
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50} p={{ base: 'sm', md: 0 }}>
            {leagues.map((league) => (
              <LeagueCard
                key={league.id}
                mode={mode}
                league={league}
                mascotUrl={mascots[league.mascot ?? '']}
                onClick={() => handleLeagueClick(league)}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>

      <ResponsiveModal opened={modalOpened} onClose={closeModal}>
        <NewLeagueForm mode={mode} mascots={mascots} onSuccess={handleLeagueCreated} />
      </ResponsiveModal>

      <ResponsiveModal opened={detailOpened} onClose={closeDetail}>
        {selectedLeague && (
          <LeagueDetail
            league={selectedLeague}
            mascotUrl={mascots[selectedLeague.mascot ?? '']}
            mode={mode}
          />
        )}
      </ResponsiveModal>
    </Box>
  );
}
