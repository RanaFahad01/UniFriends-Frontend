export interface UserProfile {
  id: number; // profile ID
  userId: number;
  username: string | null;
  avatarUrl: string | null;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
  type: 'STUDENT' | 'PERSONALITY';
  bio: string | null;
  tags: string | null; // comma-separated, e.g. "chess,python,math"
  hobbies: string | null; // comma-separated
}
