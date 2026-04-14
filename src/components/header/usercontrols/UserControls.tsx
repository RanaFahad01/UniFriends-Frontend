import {
  IconChevronDown,
  IconLogout,
  IconPacmanFilled,
  IconSchoolFilled,
  IconUserFilled,
} from '@tabler/icons-react';
import { clsx } from 'clsx';
import {
  Avatar,
  FloatingPosition,
  Group,
  Menu,
  MenuDivider,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '@/api/client';
import { useAuth } from '@/store/AuthContext';
import type { League } from '@/types/league';
import classes from './UserControls.module.css';

interface UserControlsProps {
  // Set to false when rendering inside the mobile Drawer because the Drawer has a
  // focus trap that blocks interaction with portalled elements outside its DOM.
  withinPortal?: boolean;
  menuPosition?: FloatingPosition;
}

export default function UserControls({
  withinPortal = true,
  menuPosition = 'bottom-end',
}: UserControlsProps) {
  const theme = useMantineTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: myLeagues = [] } = useQuery<League[]>({
    queryKey: ['leagues', 'me'],
    queryFn: () => apiFetch<League[]>('/api/leagues/me'),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes because league membership changes rarely
  });

  const academicLeague = myLeagues.find((l) => l.type === 'ACADEMIC');
  const homiesLeague = myLeagues.find((l) => l.type === 'HOMIES');

  const handleAcademicLeagueClick = () => {
    if (academicLeague) {
      navigate(`/academics/leagues/${academicLeague.id}`);
    } else {
      navigate('/academics/leagues');
    }
  };

  const handleHomiesLeagueClick = () => {
    if (homiesLeague) {
      navigate(`/activities/leagues/${homiesLeague.id}`);
    } else {
      navigate('/activities/leagues');
    }
  };

  return (
    <Menu
      width={260}
      position={menuPosition}
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal={withinPortal}
    >
      <Menu.Target>
        <UnstyledButton
          className={clsx(classes.user)}
        >
          <Group gap={7}>
            <Avatar src={user?.avatarUrl} alt="User avatar" radius="xl" size={20} />
            <Text fw={700} ff="heading" size="md" c="neonGold" lh={1} mr={3}>
              {user?.username}
            </Text>
            <IconChevronDown size={12} stroke={5} color={theme.colors.neonGold[5]} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label className={classes.menuHeading}>Leagues</Menu.Label>
        <Menu.Item
          className={classes.menuItem}
          leftSection={<IconSchoolFilled size={20} color={theme.colors.neonCyan[6]} />}
          onClick={handleAcademicLeagueClick}
        >
          {academicLeague ? academicLeague.name : 'Browse Academic Leagues'}
        </Menu.Item>
        <Menu.Item
          className={classes.menuItem}
          leftSection={<IconPacmanFilled size={20} color={theme.colors.neonMagenta[3]} />}
          onClick={handleHomiesLeagueClick}
        >
          {homiesLeague ? homiesLeague.name : 'Browse Extracurricular Leagues'}
        </Menu.Item>

        <Menu.Label className={classes.menuHeading}>Settings</Menu.Label>
        <Menu.Item
          className={classes.menuItem}
          leftSection={<IconUserFilled size={20} color={theme.colors.neonGold[5]} />}
          onClick={() => navigate(`/academics/profile/${user?.id}`)}
        >
          My Profile
        </Menu.Item>

        <MenuDivider />

        <Menu.Item
          className={classes.menuItem}
          color="red"
          leftSection={<IconLogout size={20} stroke={1.8} />}
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
