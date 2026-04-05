import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AcademicLayout } from './layouts/AcademicLayout';
import { ActivitiesLayout } from './layouts/ActivitiesLayout';
import { HomePage } from './pages/homepage/Home.page';
import LoginSignup from './pages/loginsignup/LoginSignup.page';
import PrivacyPolicy from './pages/privacypolicy/PrivacyPolicy.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginSignup />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/academic',
    element: <AcademicLayout />,
    children: [],
  },
  {
    path: '/activities',
    element: <ActivitiesLayout />,
    children: [],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
