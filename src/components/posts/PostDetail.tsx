import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { Alert, Anchor, Avatar, Badge, Box, Button, Divider, Group, ScrollArea, Text, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { Post } from '@/types/post';
import { formatDate } from '@/utils/formatDate';

interface PostDetailProps {
  post: Post;
  variant: 'academics' | 'activities';
  onDeleted?: () => void;
}

export function PostDetail({ post, variant, onDeleted }: PostDetailProps) {
  const mainColor = variant === 'academics' ? 'neonCyan.6' : 'neonMagenta.3';
  const { user } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isOwner = !!user && user.id === post.authorId;
  const canModerate = user?.role === 'MODERATOR' || user?.role === 'ADMIN';
  const showDelete = isOwner || canModerate;

  const deleteMutation = useMutation({
    mutationFn: () =>
      apiFetch(isOwner ? `/api/posts/${post.id}` : `/api/moderation/posts/${post.id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      onDeleted?.();
    },
    onError: (err: ApiError) => {
      setDeleteError(err.message ?? 'Could not delete post. Please try again.');
      setConfirming(false);
    },
  });

  return (
    <Box>
      <Group gap="sm" wrap="nowrap" align="center" mb="xs">
        <Avatar src={post.authorAvatarUrl} imageProps={{ referrerPolicy: 'no-referrer' }} radius="xl" size="md" alt={post.authorUsername ?? 'User'} />
        <Box style={{ flex: 1 }}>
          <Anchor
            component={Link}
            to={`/${variant}/profile/${post.authorId}`}
            size="sm"
            fw={600}
            c={mainColor}
            underline="hover"
          >
            {post.authorUsername ?? 'Unknown'}
          </Anchor>
          <Text size="xs" c="dimmed">
            {formatDate(post.createdAt)}
          </Text>
        </Box>
        {showDelete && (
          <Box>
            {confirming ? (
              <Group gap="xs">
                <Text size="xs" c="dimmed">Delete?</Text>
                <Button
                  size="xs"
                  color="red"
                  loading={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate()}
                >
                  Confirm
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  color="gray"
                  onClick={() => setConfirming(false)}
                >
                  Cancel
                </Button>
              </Group>
            ) : (
              <Button
                size="xs"
                variant="subtle"
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => setConfirming(true)}
              >
                Delete
              </Button>
            )}
          </Box>
        )}
      </Group>

      {deleteError && (
        <Alert
          icon={<IconAlertCircle size={14} />}
          color="red"
          variant="light"
          mb="sm"
          withCloseButton
          onClose={() => setDeleteError(null)}
        >
          {deleteError}
        </Alert>
      )}

      {post.tags && (
        <Group gap={6} mb="sm">
          {post.tags.split(',').map((tag) => (
            <Badge key={tag.trim()} size="sm" color={mainColor} variant="light">
              {tag.trim()}
            </Badge>
          ))}
        </Group>
      )}

      <Title order={3} mb="sm" style={{ lineHeight: 1.3 }}>
        {post.title}
      </Title>

      <Divider mb="sm" />

      <ScrollArea.Autosize mah="50vh">
        <Text size="sm" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {post.content}
        </Text>
      </ScrollArea.Autosize>
    </Box>
  );
}
