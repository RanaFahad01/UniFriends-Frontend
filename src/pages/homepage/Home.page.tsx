import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { BackgroundEffectsMagenta } from '@/components/LandingPage/BackgroundEffects/BackgroundEffectsMagenta';
import { HeroSection } from '@/components/LandingPage/HeroSection/HeroSection';
import { LandingHeader } from '@/components/LandingPage/LandingHeader/LandingHeader';
import { ScanlineOverlay } from '@/components/LandingPage/ScanlineOverlay/ScanlineOverlay';
import { SectionCard } from '@/components/LandingPage/SectionCard/SectionCard';
import classes from './Home.page.module.css';

export function HomePage() {
  return (
    <div className={classes.page}>
      {/* <BackgroundEffectsLandingPage /> */}
      <BackgroundEffectsMagenta />
      <ScanlineOverlay />
      <LandingHeader />
      <main className={classes.main}>
        <HeroSection />
        <div className={classes.grid}>
          <SectionCard
            variant="academics"
            title="Academics"
            descriptions={[
              'Find people for programming projects, studying together, etc.',
              'Find active projects and initiatives to work together on with other people.',
            ]}
          />
          <SectionCard
            variant="activities"
            title="Extracurriculars"
            descriptions={[
              'Find people for activities like gaming, sports, hobbies, etc.',
              'Find active groups and initiatives to work together on with other people.',
            ]}
          />
        </div>
      </main>
      {/* Privacy policy button */}
      <Button
        component={Link}
        to="/privacy-policy"
        color="neonMagenta"
        variant="subtle"
        className={classes.privacyButton}
      >
        Privacy Policy
      </Button>
    </div>
  );
}
