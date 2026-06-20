import { useEffect, useState } from 'react';
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Group,
  Loader,
  MultiSelect,
  Stack,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { apiFetch } from '@/api/client';
import { BackgroundEffectsCyan } from '@/components/LandingPage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/LandingPage/ScanlineOverlay/ScanlineOverlay';
import { ACADEMIC_TAGS } from '@/constants/tags';
import { useAuth } from '@/store/AuthContext';
import type { ApiError } from '@/types/api-error';
import type { Profile } from '@/types/profile';
import type { UserProfile } from '@/types/userProfile';
import { notifyError, notifySuccess } from '@/utils/notify';
import classes from './Settings.page.module.css';

interface FormValues {
  bio: string;
  tags: string[];
}

export default function StudentProfileSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => { document.title = 'Student Profile Settings · UniFriends'; }, []);

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    initialValues: { bio: '', tags: [] },
    validate: {
      bio: (v) => (!v.trim() ? 'Bio is required' : null),
      tags: (v) =>
        v.length === 0 ? 'Select at least one tag' : v.length > 5 ? 'Maximum 5 tags' : null,
    },
  });

  const {
    data: profile,
    isLoading,
    error: fetchError,
  } = useQuery<UserProfile, ApiError>({
    queryKey: ['userProfile', user?.id, 'STUDENT'],
    queryFn: () => apiFetch<UserProfile>(`/api/users/${user!.id}/profile?type=STUDENT`),
    enabled: !!user,
  });

  // Pre-populate form once profile loads
  useEffect(() => {
    if (profile) {
      form.setValues({
        bio: profile.bio ?? '',
        tags: profile.tags ? profile.tags.split(',').filter(Boolean) : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleSubmit = async (values: FormValues) => {
    if (!profile) {
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch<Profile>(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: values.bio.trim(),
          tags: values.tags.join(','),
          hobbies: profile.hobbies ?? '',
        }),
      });
      notifySuccess('Profile updated!');
      navigate(`/academics/profile/${user!.id}`);
    } catch (err) {
      notifyError((err as ApiError).message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className={classes.page}>
      <BackgroundEffectsCyan />
      <ScanlineOverlay />
      <main className={classes.main}>
        <Box className={`${classes.card} ${classes.cardCyan}`}>
          <Group justify="space-between" align="center" mb={0}>
            <Title className={`${classes.heading} ${classes.headingCyan}`}>Student Profile</Title>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              leftSection={<IconArrowLeft size={14} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Group>
          <div className={`${classes.accent} ${classes.accentCyan}`} />

          {isLoading && (
            <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
              <Loader color="neonCyan" />
            </Box>
          )}

          {fetchError && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
              {fetchError.message ?? 'Failed to load profile.'}
            </Alert>
          )}

          {!isLoading && !fetchError && profile && (
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="xl">
                <Textarea
                  label="Bio"
                  placeholder="Tell us about your academic interests..."
                  minRows={3}
                  autosize
                  {...form.getInputProps('bio')}
                />

                <MultiSelect
                  label="Tags"
                  placeholder="Select up to 5 tags"
                  data={ACADEMIC_TAGS}
                  searchable
                  clearable
                  maxValues={5}
                  {...form.getInputProps('tags')}
                />

                <Button
                  type="submit"
                  color="neonCyan"
                  fullWidth
                  size="md"
                  loading={submitting}
                  className={classes.submitButton}
                >
                  Save Changes
                </Button>
              </Stack>
            </form>
          )}
        </Box>
      </main>
    </Box>
  );
}
