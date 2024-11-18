import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '../primitives/Button';
import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SlidingCard from './SlidingCard'; 

export default function ProductHero() {
  const theme = useTheme();

  const slidingCardData = {
    title: 'Receive Messages Now', 
    body: 'Choose from our collection of numbers from all around the globe',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center' }}>
      <SlidingCard
        Badgestep={slidingCardData.Badgestep}
        image={slidingCardData.image}
        title={slidingCardData.title}
        body={slidingCardData.body}
      >
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/signup"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>

      </SlidingCard>

    </Box>
  );
}
