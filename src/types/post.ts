export interface Post {
  id: number;
  authorId: number;
  authorUsername: string | null;
  authorAvatarUrl: string | null;
  title: string; // max 150 chars
  content: string;
  type: 'ACADEMIC' | 'HOMIES';
  tags: string | null; // comma-separated, e.g. "chess,python,math" — split on "," to render pills
  createdAt: string; // ISO 8601
}
