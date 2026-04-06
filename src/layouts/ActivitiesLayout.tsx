import { Outlet } from 'react-router-dom';
import { BackgroundEffectsMagenta } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsMagenta';
import { Header } from '@/components/header/Header';

export function ActivitiesLayout() {
  return (
    <>
      <BackgroundEffectsMagenta />
      <Header />
      <Outlet />
    </>
  );
}
