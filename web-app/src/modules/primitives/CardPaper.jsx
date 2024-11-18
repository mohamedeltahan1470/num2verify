import * as React from 'react';
import { Paper, useTheme } from '@mui/material';
import GlowyShadow from './GlowyShadow';

export default function CardPaper({ children, ...props }) {
  const theme = useTheme();
  return (
    <GlowyShadow>

    <Paper
      {...props}
      elevation={3}
      sx={{
        position: 'relative',
        width: { xs: '43%', sm: '25%', md: '16%' },
        display: 'flex',
        justifyContent: 'center',
        zIndex: 2,
        bgcolor: 'background.secondary',
      }}
    >
      {children}
    </Paper>

    </GlowyShadow>

  );
}
