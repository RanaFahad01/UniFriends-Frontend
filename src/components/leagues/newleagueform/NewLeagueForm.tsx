import { useState } from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { apiFetch } from '@/api/client';
import type { ApiError } from '@/types/api-error';
import type { League } from '@/types/league';
import { notifyError, notifySuccess } from '@/utils/notify';
import classes from './NewLeagueForm.module.css';

interface NewLeagueFormProps {
  mode: 'ACADEMIC' | 'HOMIES';
  mascots: Record<string, string>;
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  description: string;
  mascot: string;
}

export function NewLeagueForm({ mode, mascots, onSuccess }: NewLeagueFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const isAcademic = mode === 'ACADEMIC';
  const headingText = isAcademic ? 'New Academic League' : 'New Extracurricular League';
  const accentColor = isAcademic ? classes.cyan : classes.magenta;
  const buttonColor = isAcademic ? 'neonCyan' : 'neonMagenta';

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      mascot: '',
    },
    validate: {
      name: (value) => {
        if (!value.trim()) {
          return 'League name is required';
        }
        if (value.length > 20) {
          return 'League name must be 20 characters or fewer';
        }
        return null;
      },
      description: (value) => {
        if (!value.trim()) {
          return 'Description is required';
        }
        if (value.length > 500) {
          return 'Description must be 500 characters or fewer';
        }
        return null;
      },
      mascot: (value) => (!value ? 'Please pick a mascot' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await apiFetch<League>('/api/leagues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          type: mode,
          description: values.description.trim(),
          mascot: values.mascot,
        }),
      });
      form.reset();
      notifySuccess('League created!');
      onSuccess();
    } catch (err) {
      notifyError((err as ApiError).message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const mascotEntries = Object.entries(mascots);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Title order={3} className={`${classes.heading} ${accentColor}`}>
          {headingText}
        </Title>

        <TextInput
          label="League Name"
          placeholder="Give your league a name"
          maxLength={20}
          {...form.getInputProps('name')}
        />

        <Textarea
          label="Description"
          placeholder="What is this league about?"
          minRows={3}
          autosize
          maxLength={500}
          {...form.getInputProps('description')}
        />

        <Box>
          <Input.Label required mb={6} display="block">
            Mascot
          </Input.Label>
          <SimpleGrid cols={4} spacing="sm">
            {mascotEntries.map(([name, url]) => {
              const isSelected = form.values.mascot === name;
              return (
                <UnstyledButton
                  key={name}
                  className={classes.mascotItem}
                  data-selected={isSelected ? 'true' : 'false'}
                  data-variant={mode}
                  onClick={() => form.setFieldValue('mascot', name)}
                  aria-label={name}
                  aria-pressed={isSelected}
                >
                  <Image src={url} alt={name} fit="contain" h={56} w={56} />
                </UnstyledButton>
              );
            })}
          </SimpleGrid>
          {form.errors.mascot && (
            <Text c="red" fz="xs" mt={4}>
              {form.errors.mascot}
            </Text>
          )}
        </Box>

        <Button
          type="submit"
          color={buttonColor}
          fullWidth
          loading={submitting}
          className={classes.submitButton}
        >
          Create League
        </Button>
      </Stack>
    </form>
  );
}
