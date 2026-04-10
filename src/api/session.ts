/**
 * Returns true if the jwt_present cookie exists, indicating an active session.
 * This avoids an unnecessary GET /api/users/me call on page load when the user
 * is not logged in. The actual jwt cookie is httpOnly and not readable by JS,
 * jwt_present is a non-sensitive companion cookie the backend sets alongside it.
 */
export function hasSession(): boolean {
  return document.cookie.split(';').some((c) => c.trim().startsWith('jwt_present='));
}
