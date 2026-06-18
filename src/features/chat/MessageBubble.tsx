import { Link } from 'react-router-dom';
import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import type { ChatMessage } from '@/types/chat';
import classes from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
  mode: 'ACADEMIC' | 'HOMIES';
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const hhmm = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  if (isToday) return hhmm;

  const monthDay = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return `${monthDay}, ${hhmm}`;
}

export function MessageBubble({ message, isOwn, mode }: MessageBubbleProps) {
  const { senderUsername, senderAvatarUrl, content, sentAt, senderId } = message;
  const initial = (senderUsername ?? '?').charAt(0).toUpperCase();
  const profilePath = `/${mode === 'ACADEMIC' ? 'academics' : 'activities'}/profile/${senderId}`;

  return (
    <Group
      align="flex-end"
      gap="xs"
      justify={isOwn ? 'flex-end' : 'flex-start'}
      wrap="nowrap"
      className={classes.row}
    >
      {!isOwn && (
        <Avatar
          size={28}
          radius="xl"
          src={senderAvatarUrl ?? undefined}
          className={classes.avatar}
          data-variant={mode}
        >
          {initial}
        </Avatar>
      )}

      <Box className={classes.bubbleWrapper} data-own={isOwn ? 'true' : 'false'}>
        {!isOwn && (
          <Text
            size="xs"
            className={classes.username}
            data-variant={mode}
            mb={2}
            component={Link}
            to={profilePath}
          >
            {senderUsername ?? 'Unknown'}
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
        <Text className={classes.timestamp} data-own={isOwn ? 'true' : 'false'}>
          {formatTime(sentAt)}
        </Text>
      </Box>

      {isOwn && (
        <Avatar
          size={28}
          radius="xl"
          src={senderAvatarUrl ?? undefined}
          className={classes.avatar}
          data-variant={mode}
        >
          {initial}
        </Avatar>
      )}
    </Group>
  );
}
