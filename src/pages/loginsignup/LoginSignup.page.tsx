import { IconBrandGoogle } from '@tabler/icons-react';
import { Box, Title, UnstyledButton } from '@mantine/core';
import { BackgroundEffectsCyan } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/landingpage/ScanlineOverlay/ScanlineOverlay';
import { Header } from '@/components/header/Header';
import classes from './LoginSignup.page.module.css';
import { GoogleButton } from '@/components/loginsignup/googlebutton/GoogleButton';

export default function LoginSignup() {
    return (
        <Box className={classes.page}>
            <BackgroundEffectsCyan />
            <ScanlineOverlay />
            <Header />
            <main className={classes.main}>
                <Box className={classes.card}>
                    <Title order={2} className={classes.heading}>Enter UniFriends</Title>
                    <div className={classes.accent} />
                    <GoogleButton>Continue with Google</GoogleButton>
                </Box>
            </main>
        </Box>
    );
}
