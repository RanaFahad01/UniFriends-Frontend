# UniFriends (Frontend)

React SPA for [UniFriends](https://www.unifriends.net), a social platform for university students to find communities around academic and extracurricular interests.

**Live → [unifriends.net](https://www.unifriends.net)** · Backend repo: [unifriends-backend](https://github.com/RanaFahad01/UniFriends-Backend)

---

## Tech stack

| Concern | Technology |
|---|---|
| Framework | React 19 + TypeScript (strict mode) + Vite |
| UI | Mantine 8 |
| Routing | React Router v7 |
| Server state | TanStack Query v5 (React Query) |
| Real-time chat | STOMP over SockJS (`@stomp/stompjs` + `sockjs-client`) |
| Hosting | Vercel |

---

## Running locally

**Prerequisites:** Node 20+, a running instance of the backend

```bash
npm install
cp .env.example .env.local   # set VITE_API_URL=http://localhost:8080
npm run dev
```

---

## Key implementation notes

**Auth**

Session state is detected via a JS-readable `jwt_present` cookie (set by the backend). The actual JWT lives in a `httpOnly` cookie invisible to JavaScript. `AuthContext` calls `/api/users/me` on load to hydrate the user object, which means no token handling in the frontend at all.

**WebSocket chat**

Before connecting, the client fetches a one-time ticket from `/api/auth/ws-ticket` (a 30s TTL UUID issued by the backend). The ticket is passed on the STOMP connect frame, keeping the JWT out of the WebSocket URL. Chat state is kept local, not in React Query.

**Role-gated UI**

Moderator controls (delete post, ban user) and the admin panel link are conditionally rendered based on `user.role` from `AuthContext`. Route-level guards wrap protected pages.

**Responsive layout**

Mantine `em`-based breakpoints throughout. `visibleFrom`/`hiddenFrom` props for responsive visibility. Mobile navigation uses a full-screen Burger menu.

---

## Project structure

```
src/
  api/          API call functions consumed by React Query hooks
  components/   Shared UI components (Header, etc.)
  features/     Feature folders: academic, activities, leagues, chat, auth
  hooks/        Custom hooks
  pages/        Route-level page components
  router/       React Router config and route guards
  store/        AuthContext and global state
  types/        Shared TypeScript interfaces synced with backend contract
```
