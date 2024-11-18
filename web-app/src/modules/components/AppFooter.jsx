import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Box sx={{color: 'common.white'}}>
      {'© '}
      <Link color="inherit" component={RouterLink} to="/">
        Num2Verify
      </Link>
      {` ${new Date().getFullYear()}. All rights reserved.`}
    </Box>
  );
}

export default function AppFooter() {
  return (
    <Box 
      component="footer" 
      sx={{
        flexShrink: 0,
        pt: 5, 
        bgcolor: 'primary.dark', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center', 
        textAlign: 'center',
      }}
    >
      <Box sx={{ px:3, mb: 3, flex: 1 }}>
        <Copyright />
      </Box>

      <Box sx={{ mb: 3, flex: 1 }}>

        <Box component="ul" sx={{color: 'common.white', listStyle: 'none', p: 0 }}>


        <Box component="li" sx={{color: 'common.white', py: 0.5 }}>
            <Link component={RouterLink} to="/about" sx={{color: 'inherit'}}>About</Link>
          </Box>

          <Box component="li" sx={{color: 'common.white', py: 0.5 }}>
            <Link component={RouterLink} to="/privacy" sx={{color: 'inherit'}}>Privacy</Link>
          </Box>

        </Box>

      </Box>

    </Box>
  );
}
