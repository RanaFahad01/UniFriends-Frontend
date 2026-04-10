export interface ChatMessage {
  id: number;
  leagueId: number;
  senderId: number;
  senderUsername: string | null;
  senderAvatarUrl: string | null;
  content: string;
  sentAt: string; // ISO 8601
}
