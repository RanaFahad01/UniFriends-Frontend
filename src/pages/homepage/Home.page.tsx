import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { BackgroundEffectsLandingPage } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsLandingPage';
import { BackgroundEffectsMagenta } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsMagenta';
import { HeroSection } from '@/components/landingpage/HeroSection/HeroSection';
import { LandingHeader } from '@/components/landingpage/LandingHeader/LandingHeader';
import { ScanlineOverlay } from '@/components/landingpage/ScanlineOverlay/ScanlineOverlay';
import { SectionCard } from '@/components/landingpage/SectionCard/SectionCard';
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
