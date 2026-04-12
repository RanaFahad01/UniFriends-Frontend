import { useState } from 'react';
import { IconSpeakerphone } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NewPostForm } from '@/components/posts/newpostform/NewPostForm';
import { PostCard } from '@/components/posts/PostCard';
import { PostDetail } from '@/components/posts/PostDetail';
import { ResponsiveModal } from '@/components/shared/ResponsiveModal';
import { useAuth } from '@/store/AuthContext';
import { dummyPosts, type Post } from './dummyPosts';
import classes from './Posts.page.module.css';

interface PostsProps {
  mode: 'academics' | 'activities';
}

export default function Posts({ mode }: PostsProps) {
  const posts = dummyPosts.filter((p) => p.mode === mode); // This filtering will be done database side in the future
  const heading = mode === 'academics' ? 'Academic Feed' : 'Extracurriculars Feed';
  const postsPageMainColor = mode === 'academics' ? 'neonCyan.6' : 'neonMagenta.3';

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
        <Stack gap="sm">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              variant={mode}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </Stack>
      </Box>

      <ResponsiveModal opened={modalOpened} onClose={closeModal}>
        <NewPostForm mode={mode} onSuccess={closeModal} />
      </ResponsiveModal>

      <ResponsiveModal opened={detailOpened} onClose={closeDetail}>
        {selectedPost && <PostDetail post={selectedPost} variant={mode} />}
      </ResponsiveModal>
    </Box>
  );
}
