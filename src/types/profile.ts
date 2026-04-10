export interface Profile {
  id: number;
  userId: number;
  type: 'STUDENT' | 'PERSONALITY';
  bio: string | null;
  tags: string | null; // comma-separated, e.g. "chess,python,math"
  hobbies: string | null; // comma-separated
}
