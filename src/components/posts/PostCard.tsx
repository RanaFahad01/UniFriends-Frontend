import clsx from 'clsx';
import { Avatar, Badge, Box, Card, Group, Text } from '@mantine/core';
import type { Post } from '@/pages/posts/dummyPosts';
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
        <Avatar radius="xl" size="md" alt={post.username} />
        <Box className={classes.content}>
          <Group gap={6} align="center">
            <Text size="sm" fw={600}>
              {post.username}
            </Text>
            <Text size="xs" c="dimmed">
              &middot;
            </Text>
            <Text size="xs" c="dimmed">
              {post.timestamp}
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
            {post.body}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}
