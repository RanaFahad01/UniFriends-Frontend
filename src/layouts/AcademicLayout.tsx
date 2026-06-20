import { Outlet } from 'react-router-dom';
import { BackgroundEffectsCyan } from '@/components/LandingPage/BackgroundEffects/BackgroundEffectsCyan';
import { Header } from '@/components/header/Header';

export function AcademicLayout() {
  return (
    <>
      <BackgroundEffectsCyan />
      <Header />
      <Outlet />
    </>
  );
}
