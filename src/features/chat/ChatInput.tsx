import { useState, type KeyboardEvent } from 'react';
import { IconLock, IconSend } from '@tabler/icons-react';
import { ActionIcon, Box, Group, Text, TextInput } from '@mantine/core';
import classes from './ChatInput.module.css';

interface ChatInputProps {
  mode: 'ACADEMIC' | 'HOMIES';
  isMember: boolean;
  onSend: (content: string) => void;
}

export function ChatInput({ mode, isMember, onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Non-members see a locked notice instead of the input.
  if (!isMember) {
    return (
      <Box className={classes.wrapper}>
        <Group className={classes.lockedNotice} gap={6} justify="center">
          <IconLock size={13} />
          <Text size="xs">Join the league to send messages</Text>
        </Group>
      </Box>
    );
  }

  return (
    <Box className={classes.wrapper}>
      <TextInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message the league..."
        classNames={{ input: classes.input, wrapper: classes.inputWrapper }}
        data-variant={mode}
        rightSection={
          <ActionIcon
            variant="subtle"
            className={classes.sendButton}
            data-variant={mode}
            data-disabled={!value.trim()}
            disabled={!value.trim()}
            onClick={handleSend}
            aria-label="Send message"
          >
            <IconSend size={16} />
          </ActionIcon>
        }
      />
    </Box>
  );
}
