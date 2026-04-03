import { createTheme, MantineColorsTuple } from '@mantine/core';

const neonMagenta: MantineColorsTuple = [
  '#f6e9ff',
  '#e5cfff',
  '#c69bff',
  '#b47cff',
  '#8c36fe',
  '#7b19fe',
  '#7209ff',
  '#6100e4',
  '#5600cc',
  '#4900b4'
];

const neonCyan: MantineColorsTuple = [
  '#deffff',
  '#cafeff',
  '#99faff',
  '#64f6ff',
  '#3df3fe',
  '#26f2fe',
  '#00eefc',
  '#00d7e4',
  '#00bfcb',
  '#00a6b1'
];


const neonGold: MantineColorsTuple = [
  '#fffce1',
  '#fff8cb',
  '#ffef9a',
  '#ffe764',
  '#ffdf38',
  '#ffdb1c',
  '#ffd700',
  '#e3bf00',
  '#caaa00',
  '#ae9200'
];

export const theme = createTheme({
  colors: {
    neonMagenta,
    neonCyan,
    neonGold,
  },
  primaryColor: 'neonCyan',
  primaryShade: 6,
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'xs',
});
