import React from 'react';
import Button from '../modules/primitives/Button';
import { Container, Typography, Box, Badge, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SlidingCardSection from '../modules/components/SlidingCardSection';
import slidingCardsData from '../jsonData/slidingCardsData.json'

const About = () => {

    React.useEffect(() => {
      window.scrollTo(0, 0); 
  }, []);

  return (
    <Container sx={{ mt: 25 }}>
      {Object.keys(slidingCardsData).map((sectionKey) => (
        <SlidingCardSection
          key={sectionKey}
          slidingCardData={slidingCardsData[sectionKey]}
        />
      ))}

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 12 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', py: 1, mb: 7, textAlign: 'center' }}>
          Create any account you want using a virtual number!
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/signup"
          darkerOnDarkMode={true}
          sx={{ minWidth: 200,  }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default About;
