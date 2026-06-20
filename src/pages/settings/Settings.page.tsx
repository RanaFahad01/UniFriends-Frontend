import { useState } from 'react';
import { IconAlertCircle, IconArrowLeft, IconPacmanFilled, IconSchoolFilled, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '@/api/client';
import { BackgroundEffectsCyan } from '@/components/LandingPage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/LandingPage/ScanlineOverlay/ScanlineOverlay';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import classes from './Settings.page.module.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [confirmUsername, setConfirmUsername] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: () => apiFetch('/api/users/me', { method: 'DELETE' }),
    onSuccess: () => {
      logout();
    },
    onError: (err: ApiError) => {
      setDeleteError(err.message ?? 'Could not delete account. Please try again.');
    },
  });

  const handleCloseDeleteModal = () => {
    closeDeleteModal();
    setConfirmUsername('');
    setDeleteError(null);
  };

  const usernameMatches = confirmUsername === user?.username;

  return (
    <Box className={classes.page}>
      <BackgroundEffectsCyan />
      <ScanlineOverlay />

      <Box className={classes.landingPage}>
        <Box className={classes.landingContainer}>
          <Group gap="sm" align="center" mb="1.5rem">
            <ActionIcon variant="subtle" color="gray" size="lg" onClick={() => navigate(-1)} aria-label="Go back">
              <IconArrowLeft size={20} />
            </ActionIcon>
            <Title order={2} className={classes.landingHeading} c="neonGold.5">
              Settings
            </Title>
          </Group>

          {/* Profile editors */}
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb="sm" ff="heading">
            Profiles
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="xl">
            <Paper className={classes.profileCardCyan} withBorder p="lg">
              <Stack gap="sm">
                <Group gap="xs">
                  <IconSchoolFilled size={20} color="var(--mantine-color-neonCyan-6)" />
                  <Text fw={700} ff="heading" fz="lg" c="neonCyan.6">
                    Academic Profile
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  Edit your bio, interests, and academic tags.
                </Text>
                <Button
                  variant="outline"
                  color="neonCyan"
                  size="sm"
                  ff="heading"
                  fz="md"
                  onClick={() => navigate('/settings/student-profile')}
                >
                  Edit
                </Button>
              </Stack>
            </Paper>

            <Paper className={classes.profileCardMagenta} withBorder p="lg">
              <Stack gap="sm">
                <Group gap="xs">
                  <IconPacmanFilled size={20} color="var(--mantine-color-neonMagenta-3)" />
                  <Text fw={700} ff="heading" fz="lg" c="neonMagenta.3">
                    Extracurricular Profile
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  Edit your bio, hobbies, and activity tags.
                </Text>
                <Button
                  variant="outline"
                  color="neonMagenta"
                  size="sm"
                  ff="heading"
                  fz="md"
                  onClick={() => navigate('/settings/personality-profile')}
                >
                  Edit
                </Button>
              </Stack>
            </Paper>
          </SimpleGrid>

          {/* Danger zone */}
          <Box className={classes.dangerZone}>
            <Divider mb="xl" />
            <Title order={4} c="red" ff="heading" tt="uppercase" mb="sm">
              Danger Zone
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              Permanently deletes your account, profiles, posts, and all associated data. This cannot be undone.
            </Text>
            <Button
              variant="outline"
              color="red"
              leftSection={<IconTrash size={16} />}
              ff="heading"
              fz="md"
              onClick={openDeleteModal}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>

      <ResponsiveModal opened={deleteModalOpened} onClose={handleCloseDeleteModal} size="sm">
        <Stack gap="md">
          <Title order={3} c="red" ff="heading" tt="uppercase">
            Delete Account
          </Title>
          <Text size="sm" c="dimmed">
            This will permanently delete your account and all associated data. You will be logged out immediately.
          </Text>
          <TextInput
            label={`Type "${user?.username}" to confirm`}
            placeholder={user?.username ?? ''}
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.currentTarget.value)}
          />
          {deleteError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
              withCloseButton
              onClose={() => setDeleteError(null)}
            >
              {deleteError}
            </Alert>
          )}
          <Group justify="flex-end" gap="sm">
            <Button variant="subtle" color="gray" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button
              color="red"
              disabled={!usernameMatches}
              loading={deleteMutation.isPending}
              leftSection={<IconTrash size={16} />}
              onClick={() => deleteMutation.mutate()}
            >
              Delete Account
            </Button>
          </Group>
        </Stack>
      </ResponsiveModal>
    </Box>
  );
}
