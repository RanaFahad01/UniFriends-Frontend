export interface Post {
  id: number;
  authorId: number;
  authorUsername: string | null;
  authorAvatarUrl: string | null;
  content: string;
  type: 'ACADEMIC' | 'HOMIES';
  createdAt: string; // ISO 8601
}
