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

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public routes
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginSignup /> },
      { path: '/auth/callback', element: <AuthCallback /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      {
        path: '/academics',
        element: <AcademicLayout />,
        children: [{ path: 'posts', element: <Posts mode="academic" /> }],
      },
      {
        path: '/activities',
        element: <ActivitiesLayout />,
        children: [{ path: 'posts', element: <Posts mode="extracurricular" /> }],
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [{ path: '/onboarding', element: <Onboarding /> }],
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
