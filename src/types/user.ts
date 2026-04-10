export interface User {
  id: number;
  email: string;
  username: string | null;
  avatarUrl: string | null;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
  isNewUser: boolean;
}
