import { useEffect, useState } from 'react';
import { IconCheck, IconLogout, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  MultiSelect,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { apiFetch } from '@/api/client';
import { BackgroundEffectsCyan } from '@/components/LandingPage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/LandingPage/ScanlineOverlay/ScanlineOverlay';
import { ACADEMIC_TAGS, ACTIVITY_TAGS } from '@/constants/tags';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import classes from './Onboarding.page.module.css';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,15}$/;

type UsernameStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'profanity';

interface FormValues {
  username: string;
  academicBio: string;
  academicTags: string[];
  personalityBio: string;
  personalityTags: string[];
}

interface UsernameCheckResponse {
  available: boolean;
  profanityFlagged: boolean;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    document.title = 'Create your profile! · UniFriends';
  }, []);

  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      // Hard redirect to the landing page — clears React state along with the server cookies
      window.location.href = '/';
    }
  };

  const form = useForm<FormValues>({
    initialValues: {
      username: '',
      academicBio: '',
      academicTags: [],
      personalityBio: '',
      personalityTags: [],
    },
    validate: {
      username: (v) => {
        if (!v.trim()) {
          return 'Username is required';
        }
        if (!USERNAME_REGEX.test(v)) {
          return '3–15 characters, letters, numbers, and underscores only';
        }
        return null;
      },
      academicBio: (v) => (!v.trim() ? 'Bio is required' : null),
      academicTags: (v) =>
        v.length === 0 ? 'Select at least one tag' : v.length > 5 ? 'Maximum 5 tags' : null,
      personalityBio: (v) => (!v.trim() ? 'Bio is required' : null),
      personalityTags: (v) =>
        v.length === 0 ? 'Select at least one tag' : v.length > 5 ? 'Maximum 5 tags' : null,
    },
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('username', e.currentTarget.value);
    // Reset check state whenever the user edits the username
    if (usernameStatus !== 'idle') {
      setUsernameStatus('idle');
    }
  };

  const handleCheckUsername = async () => {
    const { username } = form.values;

    const formatError = form.validateField('username').error;
    if (formatError) {
      return;
    }

    setUsernameStatus('checking');
    try {
      const res = await apiFetch<UsernameCheckResponse>(
        `/api/onboarding/username/check?username=${encodeURIComponent(username)}`
      );
      if (res.profanityFlagged) {
        setUsernameStatus('profanity');
      } else if (!res.available) {
        setUsernameStatus('unavailable');
      } else {
        setUsernameStatus('available');
      }
    } catch {
      setUsernameStatus('idle');
    }
  };

  const getUsernameError = (): string | null => {
    if (usernameStatus === 'unavailable') {
      return 'Username is already taken';
    }
    if (usernameStatus === 'profanity') {
      return 'Username contains inappropriate language';
    }
    return (form.errors.username as string | null) ?? null;
  };

  const getUsernameRightSection = () => {
    if (usernameStatus === 'available') {
      return <IconCheck size={16} color="var(--mantine-color-green-5)" />;
    }
    if (usernameStatus === 'unavailable' || usernameStatus === 'profanity') {
      return <IconX size={16} color="var(--mantine-color-red-5)" />;
    }
    return null;
  };

  const handleSubmit = async (values: FormValues) => {
    if (usernameStatus !== 'available') {
      form.setFieldError('username', 'Please check username availability first');
      return;
    }

    setApiError(null);
    setSubmitting(true);
    try {
      await apiFetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          academic: {
            bio: values.academicBio,
            tags: values.academicTags,
            hobbies: [],
          },
          personality: {
            bio: values.personalityBio,
            tags: values.personalityTags,
            hobbies: [],
          },
        }),
      });
      await refreshUser();
      navigate('/academics/posts', { replace: true });
    } catch (err) {
      setApiError((err as ApiError).message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className={classes.page}>
      <BackgroundEffectsCyan />
      <ScanlineOverlay />
      <main className={classes.main}>
        <Box className={classes.card}>
          <Group justify="space-between" align="center" mb={0}>
            <Title className={classes.heading}>Onboarding</Title>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              leftSection={<IconLogout size={14} />}
              loading={loggingOut}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Group>
          <div className={classes.accent} />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xl">
              {/* Username */}
              <Stack gap="xs">
                <Group gap="sm" wrap="nowrap" align="flex-end">
                  <TextInput
                    label="Username"
                    placeholder="your_username"
                    className={classes.usernameInput}
                    value={form.values.username}
                    onChange={handleUsernameChange}
                    error={getUsernameError()}
                    rightSection={getUsernameRightSection()}
                  />
                  <Button
                    variant="outline"
                    color="neonCyan"
                    loading={usernameStatus === 'checking'}
                    onClick={handleCheckUsername}
                    mb={getUsernameError() ? 22 : 0}
                  >
                    Check
                  </Button>
                </Group>
              </Stack>

              {/* Academic profile section */}
              <Stack gap="md">
                <Divider
                  label={
                    <Title
                      order={4}
                      className={`${classes.sectionTitle} ${classes.sectionTitleCyan}`}
                    >
                      Student — Academic Profile
                    </Title>
                  }
                  labelPosition="left"
                  color="neonCyan.8"
                />
                <Textarea
                  label="Bio"
                  placeholder="Tell us about your academic interests..."
                  minRows={3}
                  autosize
                  {...form.getInputProps('academicBio')}
                />
                <MultiSelect
                  label="Tags"
                  placeholder="Select up to 5 tags"
                  data={ACADEMIC_TAGS}
                  searchable
                  clearable
                  maxValues={5}
                  {...form.getInputProps('academicTags')}
                />
              </Stack>

              {/* Personality profile section */}
              <Stack gap="md">
                <Divider
                  label={
                    <Title
                      order={4}
                      className={`${classes.sectionTitle} ${classes.sectionTitleMagenta}`}
                    >
                      Personality — Extracurriculars Profile
                    </Title>
                  }
                  labelPosition="left"
                  color="neonMagenta.8"
                />
                <Textarea
                  label="Bio"
                  placeholder="Tell us about your hobbies and interests..."
                  minRows={3}
                  autosize
                  styles={{
                    input: {
                      '--input-bd-focus': 'var(--mantine-color-neonMagenta-6)',
                    } as React.CSSProperties,
                  }}
                  {...form.getInputProps('personalityBio')}
                />
                <MultiSelect
                  label="Tags"
                  placeholder="Select up to 5 tags"
                  data={ACTIVITY_TAGS}
                  searchable
                  clearable
                  maxValues={5}
                  styles={{
                    input: {
                      '--input-bd-focus': 'var(--mantine-color-neonMagenta-6)',
                    } as React.CSSProperties,
                  }}
                  {...form.getInputProps('personalityTags')}
                />
              </Stack>

              {/* API error */}
              {apiError && (
                <Alert
                  color="red"
                  variant="light"
                  withCloseButton
                  onClose={() => setApiError(null)}
                >
                  {apiError}
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="submit"
                color="neonCyan"
                fullWidth
                size="md"
                loading={submitting}
                disabled={usernameStatus !== 'available'}
                className={classes.submitButton}
              >
                Complete Onboarding
              </Button>
            </Stack>
          </form>
        </Box>
      </main>
    </Box>
  );
}
