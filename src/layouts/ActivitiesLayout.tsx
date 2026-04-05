import { Outlet } from 'react-router-dom';
import { BackgroundEffectsMagenta } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsMagenta';

export function ActivitiesLayout() {
  return (
    <>
      <BackgroundEffectsMagenta />
      <Outlet />
    </>
  );
}
