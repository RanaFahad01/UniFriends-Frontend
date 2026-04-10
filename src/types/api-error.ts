export interface ApiError {
  status: number;
  error: string; // e.g. "Conflict", "Not Found", "Forbidden"
  message: string; // human-readable, safe to show the user
}
