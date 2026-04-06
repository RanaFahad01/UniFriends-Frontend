import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AcademicLayout } from './layouts/AcademicLayout';
import { ActivitiesLayout } from './layouts/ActivitiesLayout';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/homepage/Home.page';
import LoginSignup from './pages/loginsignup/LoginSignup.page';
import PrivacyPolicy from './pages/privacypolicy/PrivacyPolicy.page';
import Posts from './pages/posts/Posts.page';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginSignup />,
        loader: () => new Promise((resolve) => setTimeout(resolve, 1500)), // TODO: remove after testing progress bar
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/academics',
        element: <AcademicLayout />,
        children: [
          { path: 'posts', element: <Posts mode="academic" /> },
        ],
      },
      {
        path: '/extracurriculars',
        element: <ActivitiesLayout />,
        children: [
          { path: 'posts', element: <Posts mode="extracurricular" /> },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
