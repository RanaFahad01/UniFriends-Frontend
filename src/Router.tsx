import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AcademicLayout } from './layouts/AcademicLayout';
import { ActivitiesLayout } from './layouts/ActivitiesLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { RootLayout } from './layouts/RootLayout';
import AuthCallback from './pages/auth/AuthCallback.page';
import { HomePage } from './pages/homepage/Home.page';
import LoginSignup from './pages/loginsignup/LoginSignup.page';
import Onboarding from './pages/onboarding/Onboarding.page';
import Posts from './pages/posts/Posts.page';
import PrivacyPolicy from './pages/privacypolicy/PrivacyPolicy.page';
import UserProfile from './pages/profile/UserProfile.page';
import PersonalityProfileSettings from './pages/settings/PersonalityProfile.page';
import StudentProfileSettings from './pages/settings/StudentProfile.page';

const LeaguesPage = lazy(() => import('./pages/leagues/Leagues.page'));
const LeagueChatPage = lazy(() => import('./pages/leagues/LeagueChat.page'));
const AdminPage = lazy(() => import('./pages/admin/Admin.page'));
const SettingsPage = lazy(() => import('./pages/settings/Settings.page'));
const NotFoundPage = lazy(() => import('./pages/notfound/NotFound.page'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public routes
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginSignup /> },
      { path: '/auth/callback', element: <AuthCallback /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/onboarding', element: <Onboarding /> }, // guarded globally by RootLayout
      {
        path: '/academics',
        element: <AcademicLayout />,
        children: [
          { path: 'posts', element: <Posts mode="academics" /> },
          {
            path: 'leagues',
            element: (
              <Suspense fallback={null}>
                <LeaguesPage mode="ACADEMIC" />
              </Suspense>
            ),
          },
          { path: 'profile/:userId', element: <UserProfile type="STUDENT" /> },
          // Protected: requires login
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: 'leagues/:id/chat',
                element: (
                  <Suspense fallback={null}>
                    <LeagueChatPage mode="ACADEMIC" />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: '/activities',
        element: <ActivitiesLayout />,
        children: [
          { path: 'posts', element: <Posts mode="activities" /> },
          {
            path: 'leagues',
            element: (
              <Suspense fallback={null}>
                <LeaguesPage mode="HOMIES" />
              </Suspense>
            ),
          },
          { path: 'profile/:userId', element: <UserProfile type="HOMIES" /> },
          // Protected: requires login
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: 'leagues/:id/chat',
                element: (
                  <Suspense fallback={null}>
                    <LeagueChatPage mode="HOMIES" />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/settings',
            element: (
              <Suspense fallback={null}>
                <SettingsPage />
              </Suspense>
            ),
          },
          { path: '/settings/student-profile', element: <StudentProfileSettings /> },
          { path: '/settings/personality-profile', element: <PersonalityProfileSettings /> },
        ],
      },

      // Admin-only routes
      {
        element: <ProtectedRoute requiredRole="ADMIN" />,
        children: [
          {
            path: '/admin',
            element: (
              <Suspense fallback={null}>
                <AdminPage />
              </Suspense>
            ),
          },
        ],
      },

      // 404
      {
        path: '*',
        element: (
          <Suspense fallback={null}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
