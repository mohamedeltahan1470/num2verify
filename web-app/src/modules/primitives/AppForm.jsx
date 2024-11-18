import * as React from 'react';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function AppForm({children, extraSx, ...props}) {
  return (
    <Container
    {...props}
      sx={{maxWidth: {xs: '100%', sm:'600px', md:'600px' }, ...extraSx, display: 'flex',
        justifyContent: 'center'
      }}
      >
          <Paper
          elevation = {3}
          sx={{py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 }, mt: 7, mb: 12, bgcolor: 'background.secondary'  }}>
          {children}
          </Paper>
    </Container>
  );
}

export default AppForm;
