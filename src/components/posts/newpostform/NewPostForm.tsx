import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, MultiSelect, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { apiFetch } from '@/api/client';
import { ACADEMIC_TAGS, ACTIVITY_TAGS } from '@/constants/tags';
import type { ApiError } from '@/types/api-error';
import type { Post } from '@/types/post';
import classes from './NewPostForm.module.css';

interface NewPostFormProps {
  mode: 'academics' | 'activities';
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tags: string[];
}

export function NewPostForm({ mode, onSuccess }: NewPostFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isAcademic = mode === 'academics';
  const headingText = isAcademic ? 'New Academic Post' : 'New Extracurricular Post';
  const accentColor = isAcademic ? classes.cyan : classes.magenta;
  const buttonColor = isAcademic ? 'neonCyan' : 'neonMagenta';
  const tagOptions = isAcademic ? ACADEMIC_TAGS : ACTIVITY_TAGS;

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      content: '',
      tags: [],
    },
    validate: {
      title: (value) => {
        if (!value.trim()) {
          return 'Title is required';
        }
        if (value.length > 150) {
          return 'Title must be 150 characters or fewer';
        }
        return null;
      },
      content: (value) => (!value.trim() ? 'Content is required' : null),
      tags: (value) => (value.length > 5 ? 'Maximum 5 tags allowed' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setApiError(null);
    setSubmitting(true);
    try {
      await apiFetch<Post>('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title.trim(),
          content: values.content.trim(),
          type: isAcademic ? 'ACADEMIC' : 'HOMIES',
          tags: values.tags.length > 0 ? values.tags : undefined,
        }),
      });
      form.reset();
      onSuccess();
    } catch (err) {
      setApiError((err as ApiError).message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Title order={3} className={`${classes.heading} ${accentColor}`}>
          {headingText}
        </Title>

        {apiError && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="red"
            variant="light"
            onClose={() => setApiError(null)}
            withCloseButton
          >
            {apiError}
          </Alert>
        )}

        <TextInput
          label="Title"
          placeholder="Give your post a title"
          maxLength={150}
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Content"
          placeholder="What's on your mind?"
          minRows={4}
          autosize
          {...form.getInputProps('content')}
        />

        <MultiSelect
          label="Tags"
          placeholder="Select up to 5 tags"
          data={tagOptions}
          searchable
          clearable
          maxValues={5}
          limit={6}
          {...form.getInputProps('tags')}
        />

        <Button
          type="submit"
          color={buttonColor}
          fullWidth
          loading={submitting}
          className={classes.submitButton}
        >
          Submit Post
        </Button>
      </Stack>
    </form>
  );
}
