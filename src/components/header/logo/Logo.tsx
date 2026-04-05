import React from 'react'
import classes from './Logo.module.css';
import { Box, Title } from '@mantine/core';

export default function Logo() {
    return (
        <Box className={classes.logoBox}>
            <Title order={1} className={classes.logo} >
                Unifriends
            </Title>
        </Box>
    )
}
