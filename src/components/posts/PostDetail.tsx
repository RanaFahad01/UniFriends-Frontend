import { Avatar, Badge, Box, Divider, Group, ScrollArea, Text, Title } from '@mantine/core';
import type { Post } from '@/pages/posts/dummyPosts';

interface PostDetailProps {
  post: Post;
  variant: 'academics' | 'activities';
}

export function PostDetail({ post, variant }: PostDetailProps) {
  const mainColor = variant === 'academics' ? 'neonCyan.6' : 'neonMagenta.3';

  return (
    <Box>
      <Group gap="sm" wrap="nowrap" align="center" mb="xs">
        <Avatar radius="xl" size="md" alt={post.username} />
        <Box>
          <Text size="sm" fw={600}>
            {post.username}
          </Text>
          <Text size="xs" c="dimmed">
            {post.timestamp}
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
          {post.body}
        </Text>
      </ScrollArea.Autosize>
    </Box>
  );
}
