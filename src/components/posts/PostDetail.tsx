import { Avatar, Badge, Box, Divider, Group, ScrollArea, Text, Title } from '@mantine/core';
import type { Post } from '@/types/post';
import { formatDate } from '@/utils/formatDate';

interface PostDetailProps {
  post: Post;
  variant: 'academics' | 'activities';
}

export function PostDetail({ post, variant }: PostDetailProps) {
  const mainColor = variant === 'academics' ? 'neonCyan.6' : 'neonMagenta.3';

  return (
    <Box>
      <Group gap="sm" wrap="nowrap" align="center" mb="xs">
        <Avatar src={post.authorAvatarUrl} radius="xl" size="md" alt={post.authorUsername ?? 'User'} />
        <Box>
          <Text size="sm" fw={600}>
            {post.authorUsername ?? 'Unknown'}
          </Text>
          <Text size="xs" c="dimmed">
            {formatDate(post.createdAt)}
          </Text>
        </Box>
      </Group>

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
