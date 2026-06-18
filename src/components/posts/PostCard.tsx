import clsx from 'clsx';
import { Avatar, Badge, Box, Card, Group, Text } from '@mantine/core';
import type { Post } from '@/types/post';
import { formatDate } from '@/utils/formatDate';
import classes from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  variant: 'academics' | 'activities';
  onClick?: () => void;
}

export function PostCard({ post, variant, onClick }: PostCardProps) {
  const postsPageMainColor = variant === 'academics' ? 'neonCyan.6' : 'neonMagenta.3';

  return (
    <Card className={clsx(classes.card, classes[variant])} padding="md" radius="sm" onClick={onClick}>
      <Group gap="sm" wrap="nowrap" align="flex-start">
        <Avatar src={post.authorAvatarUrl} imageProps={{ referrerPolicy: 'no-referrer' }} radius="xl" size="md" alt={post.authorUsername ?? 'User'} />
        <Box className={classes.content}>
          <Group gap={6} align="center">
            <Text size="sm" fw={600}>
              {post.authorUsername ?? 'Unknown'}
            </Text>
            <Text size="xs" c="dimmed">
              &middot;
            </Text>
            <Text size="xs" c="dimmed">
              {formatDate(post.createdAt)}
            </Text>
            <Group gap={4}>
              {post.tags &&
                post.tags.split(',').map((tag) => (
                  <Badge key={tag.trim()} size="xs" color={postsPageMainColor} variant="light">
                    {tag.trim()}
                  </Badge>
                ))}
            </Group>
          </Group>
          <Text fw={700} size="md" mt={6} className={classes.title}>
            {post.title}
          </Text>
          <Text size="sm" c="dimmed" mt={4} lineClamp={2}>
            {post.content}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}
