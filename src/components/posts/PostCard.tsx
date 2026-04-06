import { Avatar, Box, Card, Group, Text } from '@mantine/core';
import clsx from 'clsx';
import type { Post } from '@/pages/posts/dummyPosts';
import classes from './PostCard.module.css';

interface PostCardProps {
    post: Post;
    variant: 'academic' | 'extracurricular';
}

export function PostCard({ post, variant }: PostCardProps) {
    return (
        <Card
            className={clsx(classes.card, classes[variant])}
            padding="md"
            radius="sm"
        >
            <Group gap="sm" wrap="nowrap" align="flex-start">
                <Avatar radius="xl" size="md" alt={post.username} />
                <Box className={classes.content}>
                    <Group gap={6} align="center">
                        <Text size="sm" fw={600}>
                            {post.username}
                        </Text>
                        <Text size="xs" c="dimmed">&middot;</Text>
                        <Text size="xs" c="dimmed">{post.timestamp}</Text>
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
