import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { ActionIcon, Box, Center, Group, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '@/api/client';
import { useAuth } from '@/store/AuthContext';
import type { ChatMessage } from '@/types/chat';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { useMessageHistory } from './useMessageHistory';
import { useStompChat } from './useStompChat';
import classes from './LeagueChat.module.css';

interface LeagueChatProps {
  leagueId: number;
  leagueName: string;
  mode: 'ACADEMIC' | 'HOMIES';
}

export function LeagueChat({ leagueId, leagueName, mode }: LeagueChatProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);

  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMessageHistory(leagueId, true);

  const handleMessage = useCallback((msg: ChatMessage) => {
    setRealtimeMessages((prev) => {
      // Dedup: ignore if already in realtime list
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  }, []);

  const { sendMessage } = useStompChat({ leagueId, enabled: true, onMessage: handleMessage });

  const historyIds = new Set(messages.map((m) => m.id));
  const filteredRealtime = realtimeMessages.filter((m) => !historyIds.has(m.id));
  const allMessages = [...messages, ...filteredRealtime];

  // Auto-scroll to bottom when realtime messages arrive (not when loading older history)
  useEffect(() => {
    if (filteredRealtime.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredRealtime.length]);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (!isLoading && messages.length > 0 && prevMessageCountRef.current === 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }
  }, [isLoading, messages.length]);

  // Restore scroll position when older messages are prepended
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const prev = prevMessageCountRef.current;
    const current = allMessages.length;
    if (current > prev && prev > 0 && filteredRealtime.length === realtimeMessages.length) {
      const oldScrollHeight = viewport.scrollHeight;
      requestAnimationFrame(() => {
        viewport.scrollTop = viewport.scrollHeight - oldScrollHeight;
      });
    }
    prevMessageCountRef.current = current;
  }, [allMessages.length, filteredRealtime.length, realtimeMessages.length]);

  // Mark messages as read on mount
  useEffect(() => {
    apiFetch(`/api/leagues/${leagueId}/read`, { method: 'POST' }).catch(() => {});
  }, [leagueId]);

  const handleScrollPositionChange = ({ y }: { x: number; y: number }) => {
    if (y < 50 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSend = (content: string) => {
    sendMessage(content);
  };

  return (
    <Box className={classes.container} data-variant={mode}>
      <Box className={classes.header} data-variant={mode}>
        <Group gap="xs" align="center">
          <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => navigate(-1)} aria-label="Go back">
            <IconArrowLeft size={16} />
          </ActionIcon>
          <Text size="xs" fw={700} ff="heading" className={classes.headerText} data-variant={mode}>
            {leagueName}
          </Text>
        </Group>
      </Box>

      <ScrollArea
        className={classes.messageArea}
        viewportRef={viewportRef}
        scrollbarSize={4}
        onScrollPositionChange={handleScrollPositionChange}
      >
        <Stack gap="xs" p="sm">
          {isFetchingNextPage && (
            <Center py="xs">
              <Loader size="xs" color={mode === 'ACADEMIC' ? 'neonCyan.6' : 'neonMagenta.3'} />
            </Center>
          )}

          {isLoading ? (
            <Center style={{ minHeight: 200 }}>
              <Loader color={mode === 'ACADEMIC' ? 'neonCyan.6' : 'neonMagenta.3'} />
            </Center>
          ) : allMessages.length === 0 ? (
            <Center style={{ minHeight: 200 }}>
              <Text size="sm" c="dimmed">
                No messages yet. Say something!
              </Text>
            </Center>
          ) : (
            allMessages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isOwn={msg.senderId === user?.id}
                mode={mode}
              />
            ))
          )}

          <div ref={bottomRef} />
        </Stack>
      </ScrollArea>

      <ChatInput mode={mode} isMember={true} onSend={handleSend} />
    </Box>
  );
}
