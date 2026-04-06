import { Box, Text, Title } from '@mantine/core';
import classes from './SectionCard.module.css';
import { Link } from 'react-router-dom';

interface SectionCardProps {
  variant: 'academics' | 'extracurriculars';
  title: string;
  descriptions: string[];
}

export function SectionCard({ variant, title, descriptions }: SectionCardProps) {
  return (
    <Link to={`/${variant}/posts`} style={{ textDecoration: 'none' }}>
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
    </Link>
  );
}
