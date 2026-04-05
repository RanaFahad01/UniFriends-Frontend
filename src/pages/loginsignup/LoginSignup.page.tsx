import React from 'react'
import classes from './LoginSignup.page.module.css';
import { BackgroundEffectsCyan } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsCyan';
import { Header } from '@/components/header/Header';

export default function LoginSignup() {
    return (
        <div className={classes.page}>

            <BackgroundEffectsCyan />
            <Header />

        </div>
    )
}
