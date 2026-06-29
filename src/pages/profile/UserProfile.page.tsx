import { useEffect, useState } from 'react';
import { IconAlertCircle, IconArrowLeft, IconChevronDown, IconEdit, IconFlag } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { apiFetch } from '@/api/client';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { UserProfile } from '@/types/userProfile';
import { notifyError, notifySuccess } from '@/utils/notify';
import classes from './UserProfile.page.module.css';

interface UserProfilePageProps {
  type: 'STUDENT' | 'HOMIES';
}

interface ReportFormValues {
  reason: string;
}

export default function UserProfilePage({ type }: UserProfilePageProps) {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const profileType = type === 'STUDENT' ? 'STUDENT' : 'PERSONALITY';
  const isAcademic = type === 'STUDENT';
  const accentColor = isAcademic ? 'neonCyan.6' : 'neonMagenta.3';
  const buttonColor = isAcademic ? 'neonCyan' : 'neonMagenta';
  const settingsPath = isAcademic ? '/settings/student-profile' : '/settings/personality-profile';

  const [reportModalOpened, { open: openReportModal, close: closeReportModal }] =
    useDisclosure(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const reportForm = useForm<ReportFormValues>({
    initialValues: { reason: '' },
    validate: {
      reason: (value) => {
        if (!value.trim()) {
          return 'Reason is required';
        }
        if (value.trim().length < 10) {
          return 'Reason must be at least 10 characters';
        }
        if (value.length > 500) {
          return 'Reason must be 500 characters or fewer';
        }
        return null;
      },
    },
  });

  const parsedUserId = userId ? parseInt(userId, 10) : null;

  const roleMutation = useMutation({
    mutationFn: ({ path, method }: { path: string; method: string }) =>
      apiFetch(path, { method }),
    onSuccess: () => {
      notifySuccess('Role updated.');
      queryClient.invalidateQueries({ queryKey: ['userProfile', parsedUserId, profileType] });
    },
    onError: (err: ApiError) => {
      notifyError(err.message ?? 'Could not update role. Please try again.');
    },
  });

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfile, ApiError>({
    queryKey: ['userProfile', parsedUserId, profileType],
    queryFn: () => apiFetch<UserProfile>(`/api/users/${parsedUserId}/profile?type=${profileType}`),
    enabled: !!parsedUserId && !isNaN(parsedUserId),
  });

  useEffect(() => {
    if (profile) {
      document.title = `${profile.username ?? 'User'}'s Profile · UniFriends`;
    }
  }, [profile]);

  const handleReportSubmit = async (values: ReportFormValues) => {
    if (!parsedUserId) return;
    setReportSubmitting(true);
    try {
      await apiFetch<void>(`/api/users/${parsedUserId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: values.reason.trim() }),
      });
      reportForm.reset();
      closeReportModal();
      notifySuccess('Report submitted. Thank you.');
    } catch (err) {
      notifyError((err as ApiError).message ?? 'Something went wrong. Please try again.');
    } finally {
      setReportSubmitting(false);
    }
  };

  if (!parsedUserId || isNaN(parsedUserId)) {
    return (
      <Box className={classes.page}>
        <Box className={classes.container}>
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            Invalid user ID.
          </Alert>
        </Box>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className={classes.page}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <Loader color={accentColor} size="lg" />
        </Box>
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box className={classes.page}>
        <Box className={classes.container}>
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error?.message ?? 'Failed to load profile.'}
          </Alert>
        </Box>
      </Box>
    );
  }

  const isOwnProfile = currentUser?.id === profile.userId;
  const tags = profile.tags ? profile.tags.split(',').filter(Boolean) : [];
  const hobbies = profile.hobbies ? profile.hobbies.split(',').filter(Boolean) : [];

  return (
    <Box className={classes.page}>
      <Box className={classes.container}>
        <Group gap="sm" align="center" mb="1.25rem">
          <ActionIcon variant="subtle" color="gray" size="lg" onClick={() => navigate(-1)} aria-label="Go back">
            <IconArrowLeft size={20} />
          </ActionIcon>
        </Group>

        {/* Avatar + Username */}
        <Box className={classes.avatarSection}>
          <Avatar src={profile.avatarUrl} imageProps={{ referrerPolicy: 'no-referrer' }} size={96} radius="xl" alt={profile.username ?? 'User'} />
          <Title
            order={2}
            c={accentColor}
            ff="heading"
            style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}
          >
            {profile.username ?? 'Unknown User'}
          </Title>
        </Box>

        <Divider mb="lg" />

        <Stack gap="lg">
          {/* Bio */}
          <Box>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb={6}>
              About
            </Text>
            <Text size="sm" c={profile.bio ? 'gray.3' : 'dimmed'} style={{ lineHeight: 1.7 }}>
              {profile.bio ?? 'No bio yet.'}
            </Text>
          </Box>

          {/* Tags */}
          {tags.length > 0 && (
            <Box>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb={6}>
                Interests
              </Text>
              <Group gap={6} className={classes.tagsRow}>
                {tags.map((tag) => (
                  <Badge key={tag} size="sm" color={accentColor} variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <Box>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb={6}>
                Hobbies
              </Text>
              <Group gap={6} className={classes.tagsRow}>
                {hobbies.map((hobby) => (
                  <Badge key={hobby} size="sm" color={accentColor} variant="dot">
                    {hobby}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}
        </Stack>

        {/* Action Buttons */}
        {currentUser && (
          <Box className={classes.actionButtons}>
            <Group gap="sm" wrap="wrap">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  color={buttonColor}
                  leftSection={<IconEdit size={16} />}
                  ff="heading"
                  fz="lg"
                  onClick={() => navigate(settingsPath)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="outline"
                  color="red"
                  leftSection={<IconFlag size={16} />}
                  ff="heading"
                  fz="lg"
                  onClick={openReportModal}
                >
                  Report User
                </Button>
              )}

              {currentUser.role === 'ADMIN' && !isOwnProfile && (
                <Menu position="bottom-start">
                  <Menu.Target>
                    <Button
                      variant="outline"
                      color="neonGold"
                      rightSection={<IconChevronDown size={14} />}
                      ff="heading"
                      fz="lg"
                      loading={roleMutation.isPending}
                    >
                      Manage Role
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {profile.role === 'USER' && (
                      <>
                        <Menu.Item
                          onClick={() =>
                            roleMutation.mutate({
                              path: `/api/admin/users/${parsedUserId}/make-moderator`,
                              method: 'POST',
                            })
                          }
                        >
                          Promote to Moderator
                        </Menu.Item>
                        <Menu.Item
                          onClick={() =>
                            roleMutation.mutate({
                              path: `/api/admin/users/${parsedUserId}/make-admin`,
                              method: 'POST',
                            })
                          }
                        >
                          Promote to Admin
                        </Menu.Item>
                      </>
                    )}
                    {profile.role === 'MODERATOR' && (
                      <Menu.Item
                        color="red"
                        onClick={() =>
                          roleMutation.mutate({
                            path: `/api/admin/users/${parsedUserId}/make-moderator`,
                            method: 'DELETE',
                          })
                        }
                      >
                        Demote to User
                      </Menu.Item>
                    )}
                    {profile.role === 'ADMIN' && (
                      <Menu.Item
                        color="red"
                        onClick={() =>
                          roleMutation.mutate({
                            path: `/api/admin/users/${parsedUserId}/make-admin`,
                            method: 'DELETE',
                          })
                        }
                      >
                        Demote to User
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>

          </Box>
        )}
      </Box>

      {/* Report Modal */}
      <ResponsiveModal opened={reportModalOpened} onClose={closeReportModal}>
        <form onSubmit={reportForm.onSubmit(handleReportSubmit)}>
          <Stack gap="md">
            <Title
              order={3}
              c="red"
              ff="heading"
              style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              Report User
            </Title>

            <Textarea
              label="Reason"
              placeholder="Describe the issue (10–500 characters)"
              minRows={4}
              autosize
              maxLength={500}
              {...reportForm.getInputProps('reason')}
            />

            <Button
              type="submit"
              color="red"
              fullWidth
              loading={reportSubmitting}
              ff="heading"
              fz="lg"
              style={{ letterSpacing: '0.04em' }}
            >
              Submit Report
            </Button>
          </Stack>
        </form>
      </ResponsiveModal>
    </Box>
  );
}
