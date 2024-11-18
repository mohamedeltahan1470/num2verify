import React from 'react';
import { Typography, Box, Badge, Paper } from '@mui/material';
import SlidingCard from './SlidingCard';
import PageTitle from '../primitives/PageTitle';

export default function SlidingCardSection({ slidingCardData }) {
    const { title, cards } = slidingCardData;
  
    return (
      <>
        <PageTitle>
          {title}
        </PageTitle>
  
        <Box sx={{ my: 50 }}>
          {cards.map((card, index) => (
            <SlidingCard
              key={index}
              image={card.image}
              Badgestep={card.Badgestep}
              title={card.title}
              body={card.body}
            />
          ))}
        </Box>
      </>
    );
  }