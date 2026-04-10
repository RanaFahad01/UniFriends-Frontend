export interface League {
  id: number;
  name: string;
  type: 'ACADEMIC' | 'HOMIES';
  description: string | null;
  memberCount: number;
  createdAt: string; // ISO 8601
}
