export interface Report {
  id: number;
  reporterId: number;
  reporterUsername: string | null;
  reportedUserId: number;
  reportedUsername: string | null;
  reason: string;
  status: 'PENDING' | 'REVIEWED' | 'DISMISSED';
  createdAt: string; // ISO 8601
  reviewedAt: string | null; // ISO 8601
}
