import React from 'react';
import { Avatar, Card, Text } from '@mantine/core';
import { League } from '@/types/league';
import classes from './LeagueCard.module.css';

interface LeagueCardProps {
  league: League;
  mascotUrl: string;
  mode: 'ACADEMIC' | 'HOMIES';
  onClick?: () => void;
}

export default function LeagueCard({ league, mascotUrl, mode, onClick }: LeagueCardProps) {
  return (
    <Card
      key={league.id}
      shadow="md"
      radius="md"
      className={classes.card}
      data-variant={mode}
      padding="xl"
      onClick={onClick}
    >
      <Avatar size="xl" src={mascotUrl} className={classes.avatar} data-variant={mode} />
      <Text fz="xl" fw={700} ff="heading" className={classes.cardTitle} data-variant={mode} mt="md">
        {league.name}
      </Text>
      <Text fz="sm" c="gray.5" mt="sm">
        {league.description}
      </Text>
    </Card>
  );
}
