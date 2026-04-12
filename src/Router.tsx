import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AcademicLayout } from './layouts/AcademicLayout';
import { ActivitiesLayout } from './layouts/ActivitiesLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { RootLayout } from './layouts/RootLayout';
import AuthCallback from './pages/auth/AuthCallback.page';
import { HomePage } from './pages/homepage/Home.page';
import Leagues from './pages/leagues/Leagues.page';
import LoginSignup from './pages/loginsignup/LoginSignup.page';
import Onboarding from './pages/onboarding/Onboarding.page';
import Posts from './pages/posts/Posts.page';
import PrivacyPolicy from './pages/privacypolicy/PrivacyPolicy.page';

const LeaguesPage = lazy(() => import('./pages/leagues/Leagues.page'));

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
                <Leagues mode="HOMIES" />
              </Suspense>
            ),
          },
        ],
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [],
      },

      // Admin-only routes
      {
        element: <ProtectedRoute requiredRole="ADMIN" />,
        children: [
          // TODO: add /admin page
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
