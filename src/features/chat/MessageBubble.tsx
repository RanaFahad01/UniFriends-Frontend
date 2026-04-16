import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import type { DummyChatMessage } from './types';
import classes from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: DummyChatMessage;
  mode: 'ACADEMIC' | 'HOMIES';
}

export function MessageBubble({ message, mode }: MessageBubbleProps) {
  const { username, content, isOwn } = message;
  const initial = username.charAt(0).toUpperCase();

  return (
    <Group
      align="flex-end"
      gap="xs"
      justify={isOwn ? 'flex-end' : 'flex-start'}
      wrap="nowrap"
      className={classes.row}
    >
      {!isOwn && (
        <Avatar size={28} radius="xl" className={classes.avatar} data-variant={mode}>
          {initial}
        </Avatar>
      )}

      <Box className={classes.bubbleWrapper} data-own={isOwn ? 'true' : 'false'}>
        {!isOwn && (
          <Text size="xs" className={classes.username} data-variant={mode} mb={2}>
            {username}
          </Text>
        )}
        <Paper
          className={classes.bubble}
          data-own={isOwn ? 'true' : 'false'}
          data-variant={mode}
          px="sm"
          py={6}
        >
          <Text size="sm" className={classes.content}>
            {content}
          </Text>
        </Paper>
      </Box>

      {isOwn && (
        <Avatar size={28} radius="xl" className={classes.avatar} data-variant={mode}>
          {initial}
        </Avatar>
      )}
    </Group>
  );
}
