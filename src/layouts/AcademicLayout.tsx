import { Outlet } from 'react-router-dom';
import { BackgroundEffectsCyan } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsCyan';

export function AcademicLayout() {
  return (
    <>
      <BackgroundEffectsCyan />
      <Outlet />
    </>
  );
}
