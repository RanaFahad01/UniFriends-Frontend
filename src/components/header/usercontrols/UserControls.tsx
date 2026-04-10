import React, { useState } from 'react';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPacmanFilled,
  IconPlayerPause,
  IconSchoolFilled,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
  IconUser,
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
import { useAuth } from '@/store/AuthContext';
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
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user } = useAuth();

  return (
    <Menu
      width={260}
      position={menuPosition}
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal={withinPortal}
    >
      <Menu.Target>
        <UnstyledButton className={clsx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar src={user?.avatarUrl} alt="User avatar" radius="xl" size={20} />
            {/* TODO: Remove the fallback, username is required for every profile. */}
            <Text fw={700} ff="heading" size="md" c="neonGold" lh={1} mr={3}>
              {user?.username || 'FAHADAHMEDFAHAD'}
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
        >
          My Academic League
        </Menu.Item>
        <Menu.Item
          className={classes.menuItem}
          leftSection={<IconPacmanFilled size={20} color={theme.colors.neonMagenta[3]} />}
        >
          My Extracurriculars League
        </Menu.Item>

        <Menu.Label className={classes.menuHeading}>Settings</Menu.Label>
        <Menu.Item
          className={classes.menuItem}
          leftSection={<IconUserFilled size={20} color={theme.colors.neonGold[5]} />}
        >
          My Profile
        </Menu.Item>

        <MenuDivider />

        <Menu.Item
          className={classes.menuItem}
          color="red"
          leftSection={<IconLogout size={20} stroke={1.8} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
