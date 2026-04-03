import { Box, Text, Title } from '@mantine/core';
import classes from './SectionCard.module.css';

interface SectionCardProps {
  variant: 'academics' | 'extracurriculars';
  title: string;
  descriptions: string[];
}

export function SectionCard({ variant, title, descriptions }: SectionCardProps) {
  return (
    <Box className={classes.card} data-variant={variant}>
      <Title order={3} className={classes.heading}>
        {title}
      </Title>
      {descriptions.map((text, i) => (
        <Text key={i} className={classes.description}>
          {text}
        </Text>
      ))}
      <div className={classes.accent} />
    </Box>
  );
}
