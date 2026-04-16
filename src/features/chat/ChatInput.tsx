import { useState, type KeyboardEvent } from 'react';
import { IconSend } from '@tabler/icons-react';
import { ActionIcon, Box, TextInput } from '@mantine/core';
import classes from './ChatInput.module.css';

interface ChatInputProps {
  mode: 'ACADEMIC' | 'HOMIES';
  onSend: (content: string) => void;
}

export function ChatInput({ mode, onSend }: ChatInputProps) {
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
            data-disabled={!value.trim() ? 'true' : 'false'}
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
