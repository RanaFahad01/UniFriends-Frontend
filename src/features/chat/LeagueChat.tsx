import { useEffect, useRef, useState } from 'react';
import { Box, ScrollArea, Stack, Text } from '@mantine/core';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { academicDummyMessages, homiesDummyMessages } from './dummyMessages';
import type { DummyChatMessage } from './types';
import classes from './LeagueChat.module.css';

interface LeagueChatProps {
  mode: 'ACADEMIC' | 'HOMIES';
}

export function LeagueChat({ mode }: LeagueChatProps) {
  const initial = mode === 'ACADEMIC' ? academicDummyMessages : homiesDummyMessages;
  const [messages, setMessages] = useState<DummyChatMessage[]>(initial);
  const bottomRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on mount and whenever a new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), username: 'you', content, isOwn: true },
    ]);
  };

  const heading = mode === 'ACADEMIC' ? 'League Chat' : 'Squad Chat';

  return (
    <Box className={classes.container} data-variant={mode}>
      <Box className={classes.header} data-variant={mode}>
        <Text size="xs" fw={700} ff="heading" className={classes.headerText} data-variant={mode}>
          {heading}
        </Text>
      </Box>

      <ScrollArea className={classes.messageArea} viewportRef={viewportRef} scrollbarSize={4}>
        <Stack gap="xs" p="sm">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} mode={mode} />
          ))}
          <div ref={bottomRef} />
        </Stack>
      </ScrollArea>

      <ChatInput mode={mode} onSend={handleSend} />
    </Box>
  );
}
