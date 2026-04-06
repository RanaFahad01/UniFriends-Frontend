import { Box, Stack, Title } from '@mantine/core';
import { PostCard } from '@/components/posts/PostCard';
import { dummyPosts } from './dummyPosts';
import classes from './Posts.page.module.css';

interface PostsProps {
    mode: 'academic' | 'extracurricular';
}

export default function Posts({ mode }: PostsProps) {
    const posts = dummyPosts.filter((p) => p.mode === mode); // This filtering will be done database side in the future
    const heading = mode === 'academic' ? 'Academic Feed' : 'Extracurriculars Feed';

    return (
        <Box className={classes.page}>
            <Box className={classes.container}>
                <Title order={2} className={classes.heading} c={mode === 'academic' ? 'neonCyan.6' : 'neonMagenta.3'}>
                    {heading}
                </Title>
                <Stack gap="sm">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} variant={mode} />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
