import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconAlertCircle, IconArrowLeft, IconBan, IconCircleCheck } from '@tabler/icons-react';
import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { formatDate } from '@/utils/formatDate';
import type { ApiError } from '@/types/api-error';
import type { Page } from '@/types/pagination';
import type { Report } from '@/types/report';
import { notifyError, notifySuccess } from '@/utils/notify';
import classes from './Admin.page.module.css';

type ReportStatus = 'PENDING' | 'REVIEWED' | 'DISMISSED';

const STATUS_BADGE_COLOR: Record<ReportStatus, string> = {
  PENDING: 'yellow',
  REVIEWED: 'blue',
  DISMISSED: 'gray',
};

export default function AdminPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Admin Dashboard · UniFriends'; }, []);

  const [status, setStatus] = useState<ReportStatus>('PENDING');


  const [banTarget, setBanTarget] = useState<{ userId: number; username: string } | null>(null);
  const [banReason, setBanReason] = useState('');
  const [banError, setBanError] = useState<string | null>(null);
  const [banOpened, { open: openBan, close: closeBan }] = useDisclosure(false);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Page<Report>, ApiError>({
      queryKey: ['reports', status],
      queryFn: ({ pageParam }) =>
        apiFetch<Page<Report>>(
          `/api/moderation/reports?status=${status}&page=${pageParam}`,
        ),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.page.number >= lastPage.page.totalPages - 1
          ? undefined
          : lastPage.page.number + 1,
    });

  const reports = data?.pages.flatMap((p) => p.content) ?? [];

  const dismissMutation = useMutation({
    mutationFn: (reportId: number) =>
      apiFetch(`/api/moderation/reports/${reportId}/dismiss`, { method: 'POST' }),
    onSuccess: () => {
      notifySuccess('Report dismissed.');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
    onError: (err: ApiError) => {
      notifyError(err.message ?? 'Could not dismiss report. Please try again.');
    },
  });

  const banMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: number; reason: string }) =>
      apiFetch(`/api/admin/users/${userId}/ban`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      }),
    onSuccess: () => {
      notifySuccess(`${banTarget?.username ?? 'User'} has been banned.`);
      closeBan();
      setBanTarget(null);
      setBanReason('');
      setBanError(null);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
    onError: (err: ApiError) => {
      setBanError(err.message ?? 'Could not ban user. Please try again.');
    },
  });

  const handleOpenBan = (userId: number, username: string) => {
    setBanTarget({ userId, username });
    setBanReason('');
    setBanError(null);
    openBan();
  };

  const handleCloseBan = () => {
    closeBan();
    setBanTarget(null);
    setBanReason('');
    setBanError(null);
  };

  return (
    <Box className={classes.page}>
      <Box className={classes.container}>
        <Group gap="sm" align="center" mb="1.25rem">
          <ActionIcon variant="subtle" color="gray" size="lg" onClick={() => navigate(-1)} aria-label="Go back">
            <IconArrowLeft size={20} />
          </ActionIcon>
          <Title order={2} className={classes.heading} c="neonGold.5">
            Admin Panel
          </Title>
        </Group>

        <Tabs
          value={status}
          onChange={(v) => { if (v) setStatus(v as ReportStatus); }}
          color="neonGold"
          mb="xl"
        >
          <Tabs.List>
            <Tabs.Tab value="PENDING">Pending</Tabs.Tab>
            <Tabs.Tab value="REVIEWED">Reviewed</Tabs.Tab>
            <Tabs.Tab value="DISMISSED">Dismissed</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {isLoading && (
          <Center py="xl">
            <Loader color="neonGold.5" />
          </Center>
        )}

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error.message ?? 'Failed to load reports. Please try again.'}
          </Alert>
        )}

        {!isLoading && !error && reports.length === 0 && (
          <Center py="xl">
            <Text c="dimmed" size="sm">
              No {status.toLowerCase()} reports.
            </Text>
          </Center>
        )}

        {reports.length > 0 && (
          <Stack gap="md">
            {reports.map((report) => (
              <Paper key={report.id} p="md" withBorder>
                <Stack gap="xs">
                  <Group justify="space-between" align="center">
                    <Badge color={STATUS_BADGE_COLOR[report.status]} variant="light">
                      {report.status}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      {formatDate(report.createdAt)}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <Text size="sm" c="gray.4">Reported by:</Text>
                    <Link
                      to={`/academics/profile/${report.reporterId}`}
                      className={classes.reporterLink}
                    >
                      {report.reporterUsername ?? `User #${report.reporterId}`}
                    </Link>
                  </Group>

                  <Group gap={6}>
                    <Text size="sm" c="gray.4">Reported user:</Text>
                    <Link
                      to={`/academics/profile/${report.reportedUserId}`}
                      className={classes.reporteeLink}
                    >
                      {report.reportedUsername ?? `User #${report.reportedUserId}`}
                    </Link>
                  </Group>

                  <Text size="sm">
                    <Text span size="sm" c="gray.4">Reason: </Text>
                    <Text span size="sm" c="gray.2">{report.reason}</Text>
                  </Text>

                  {report.reviewedAt && (
                    <Text size="xs" c="dimmed">
                      Reviewed {formatDate(report.reviewedAt)}
                    </Text>
                  )}

                  {status === 'PENDING' && (
                    <>
                      <Group gap="sm" mt="xs">
                        <Button
                          size="xs"
                          variant="light"
                          color="gray"
                          leftSection={<IconCircleCheck size={14} />}
                          loading={
                            dismissMutation.isPending &&
                            dismissMutation.variables === report.id
                          }
                          onClick={() => dismissMutation.mutate(report.id)}
                        >
                          Dismiss
                        </Button>
                        <Button
                          size="xs"
                          variant="light"
                          color="red"
                          leftSection={<IconBan size={14} />}
                          onClick={() =>
                            handleOpenBan(
                              report.reportedUserId,
                              report.reportedUsername ?? `User #${report.reportedUserId}`,
                            )
                          }
                        >
                          Ban User
                        </Button>
                      </Group>
                    </>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        {hasNextPage && (
          <Center mt="lg">
            <Button
              variant="subtle"
              color="neonGold"
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              ff="heading"
              fz="md"
            >
              Load more
            </Button>
          </Center>
        )}
      </Box>

      <ResponsiveModal opened={banOpened} onClose={handleCloseBan} size="sm">
        <Title order={4} mb="md" c="red">
          Ban {banTarget?.username}
        </Title>
        <TextInput
          label="Reason"
          placeholder="Reason for banning this user..."
          value={banReason}
          onChange={(e) => setBanReason(e.currentTarget.value)}
          mb="md"
        />
        {banError && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="red"
            variant="light"
            mb="md"
            withCloseButton
            onClose={() => setBanError(null)}
          >
            {banError}
          </Alert>
        )}
        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" color="gray" onClick={handleCloseBan}>
            Cancel
          </Button>
          <Button
            color="red"
            loading={banMutation.isPending}
            disabled={!banReason.trim()}
            onClick={() => {
              if (banTarget) {
                banMutation.mutate({ userId: banTarget.userId, reason: banReason.trim() });
              }
            }}
          >
            Confirm Ban
          </Button>
        </Group>
      </ResponsiveModal>
    </Box>
  );
}
