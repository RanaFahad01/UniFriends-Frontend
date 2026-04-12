import React, { useEffect, useState } from 'react';
import { IconSpeakerphone, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LeagueCard from '@/components/leagues/LeagueCard';
import { NewPostForm } from '@/components/posts/newpostform/NewPostForm';
import { PostCard } from '@/components/posts/PostCard';
import { PostDetail } from '@/components/posts/PostDetail';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { useAuth } from '@/store/AuthContext';
import { Post } from '@/types/post';
import { dummyLeagues } from './dummyLeagues';
import classes from './Leagues.page.module.css';

// Create avatar loader maps
const academicLoaders = import.meta.glob<string>(
  './leaguemascots/academic/*.{webp,png,jpg,jpeg,svg}',
  {
    query: '?url',
    import: 'default',
  }
);

const homiesLoaders = import.meta.glob<string>('./leaguemascots/homies/*.{webp,png,jpg,jpeg,svg}', {
  query: '?url',
  import: 'default',
});

function loadersToNameMap(loaders: Record<string, () => Promise<string>>) {
  return Object.fromEntries(
    Object.entries(loaders).map(([path, loader]) => {
      const file = path.split('/').pop()!; // e.g. apple.webp
      const name = file
        .replace(/\.[^/.]+$/, '')
        .replace(/\s+/g, '')
        .toLowerCase();
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
  const theme = useMantineTheme();

  // Load mascots based on mode
  const [mascots, setMascots] = useState<Record<string, string>>({});

  useEffect(() => {
    const byName = mode === 'ACADEMIC' ? academicByName : homiesByName;

    // this loads exactly the files in that directory (8)
    Promise.all(
      Object.entries(byName).map(async ([name, load]) => [name, await load()] as const)
    ).then((entries) => setMascots(Object.fromEntries(entries)));
  }, [mode]);

  const leagues = dummyLeagues.filter((l) => l.type === mode); // This filtering will be done database side in the future
  const heading = mode === 'ACADEMIC' ? 'Academic Leagues' : 'Extracurricular Leagues';
  const leaguesPageMainColor = mode === 'ACADEMIC' ? 'neonCyan.6' : 'neonMagenta.3';

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const leagueCards = leagues.map((league) => (
    <LeagueCard key={league.id} mode={mode} league={league} mascotUrl={mascots[league.mascot]} />
  ));

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    openDetail();
  };

  const handleCreatePost = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    openModal();
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
            onClick={handleCreatePost}
          >
            Create League
          </Button>
        </Group>
        <Text c="gray.5" className={classes.description} ta="left">
          Join a league to connect with people who share your interests! Each league has its own
          chat, where you and the homies can share resources, plan meetups, and just vibe about your
          shared passion.
        </Text>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {leagueCards}
        </SimpleGrid>
      </Box>

      <ResponsiveModal opened={modalOpened} onClose={closeModal}>
        {/* <NewPostForm mode={mode} onSuccess={closeModal} /> */}
        new League
      </ResponsiveModal>

      <ResponsiveModal opened={detailOpened} onClose={closeDetail}>
        league details
      </ResponsiveModal>
    </Box>
  );
}
