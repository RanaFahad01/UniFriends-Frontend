import { type CSSProperties, useState } from 'react';
import { IconAlertCircle, IconSearch, IconSpeakerphone, IconX } from '@tabler/icons-react';
import { ActionIcon, Alert, Box, Button, Center, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '@/api/client';
import { NewPostForm } from '@/components/posts/newpostform/NewPostForm';
import { PostCard } from '@/components/posts/PostCard';
import { PostDetail } from '@/components/posts/PostDetail';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { Page } from '@/types/pagination';
import type { Post } from '@/types/post';
import classes from './Posts.page.module.css';

interface PostsProps {
  mode: 'academics' | 'activities';
}

export default function Posts({ mode }: PostsProps) {
  const apiType = mode === 'academics' ? 'ACADEMIC' : 'HOMIES';
  const heading = mode === 'academics' ? 'Academic Feed' : 'Extracurriculars Feed';
  const postsPageMainColor = mode === 'academics' ? 'neonCyan.6' : 'neonMagenta.3';
  const buttonColor = mode === 'academics' ? 'neonCyan' : 'neonMagenta';

  const [search, setSearch] = useState('');

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<Page<Post>, ApiError>({
    queryKey: ['posts', apiType],
    queryFn: ({ pageParam }) =>
      apiFetch<Page<Post>>(`/api/posts?type=${apiType}&page=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page.number >= lastPage.page.totalPages - 1
        ? undefined
        : lastPage.page.number + 1,
  });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];
  const filteredPosts = search
    ? posts.filter((p) => {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
      })
    : posts;

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    openDetail();
  };

  const handleCreatePost = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    openModal();
  };

  const handlePostCreated = () => {
    closeModal();
    refetch();
  };

  return (
    <Box className={classes.page}>
      <Box className={classes.container}>
        <Group align="center" mb="1rem">
          <Title order={2} className={classes.heading} c={postsPageMainColor}>
            {heading}
          </Title>
          <Button
            rightSection={<IconSpeakerphone />}
            variant="outline"
            color={postsPageMainColor}
            size="sm"
            ff="heading"
            fz="lg"
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </Group>

        <TextInput
          placeholder="Filter posts..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          rightSection={
            search ? (
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => setSearch('')}
                aria-label="Clear filter"
              >
                <IconX size={14} />
              </ActionIcon>
            ) : null
          }
          mb="1rem"
          styles={mode === 'activities' ? { input: { '--input-bd-focus': 'var(--mantine-color-neonMagenta-6)' } as CSSProperties } : undefined}
        />

        {/* Loading state */}
        {isLoading && (
          <Center py="xl">
            <Loader color={postsPageMainColor} />
          </Center>
        )}

        {/* Error state */}
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error.message ?? 'Failed to load posts. Please try again.'}
          </Alert>
        )}

        {/* Empty state */}
        {!isLoading && !error && posts.length === 0 && (
          <Center py="xl">
            <Text c="dimmed" size="sm">
              No posts yet. Be the first to post!
            </Text>
          </Center>
        )}

        {/* No filter results */}
        {!isLoading && !error && posts.length > 0 && filteredPosts.length === 0 && (
          <Center py="xl">
            <Text c="dimmed" size="sm">
              No posts match &ldquo;{search}&rdquo;.
            </Text>
          </Center>
        )}

        {/* Posts list */}
        {filteredPosts.length > 0 && (
          <Stack gap="sm">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                variant={mode}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </Stack>
        )}

        {/* Load more */}
        {hasNextPage && (
          <Center mt="lg">
            <Button
              variant="subtle"
              color={buttonColor}
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

      <ResponsiveModal opened={modalOpened} onClose={closeModal}>
        <NewPostForm mode={mode} onSuccess={handlePostCreated} />
      </ResponsiveModal>

      <ResponsiveModal opened={detailOpened} onClose={closeDetail}>
        {selectedPost && (
          <PostDetail
            post={selectedPost}
            variant={mode}
            onDeleted={() => { closeDetail(); refetch(); }}
          />
        )}
      </ResponsiveModal>
    </Box>
  );
}
