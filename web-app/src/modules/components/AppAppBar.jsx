import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useAuth } from '../../context';
import { IconButton, Toolbar, Tooltip, Menu, MenuItem, Drawer, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu'; 
import { useTheme } from '@mui/material/styles'; 



const menuStyle = {
  width: 250,
  padding: '10px',
  borderRadius: 5,
};

const ButtonStyle = {
  fontSize: '18px',
  padding: '12px 20px',
  textAlign: 'left',
  color:'#FFFFFF',
  ':hover' : {  bgcolor: (theme) => alpha(theme.palette.primary.dark, 1.0),
  }
};

const MenuButtonStyle = {
  fontSize: '18px',
  padding: '12px 20px',
  textAlign: 'left',
  color:'inherit',

};

function AppBarControls() {
  const { themeType, handleToggleTheme, userData, userToken, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const MenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const darkModeSwitch = (
    <Tooltip title={'Dark Mode'}>
      <IconButton onClick={handleToggleTheme} sx={{width: '50px', height:'50px'}}>
        {themeType === 'Dark' ? (
          <DarkModeIcon sx={{ color: '#FFFFFF' }} />
        ) : (
          <Brightness7Icon sx={{ color: '#FFFFFF' }} />
        )}
      </IconButton>
    </Tooltip>
  );

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', width: 250, padding: 2 }}>
      {userToken ? (
        <>
          <Button
            variant="h6"
            component={RouterLink}
            to="/mynumbers"
            onClick={toggleDrawer(false)}
            sx={ButtonStyle}
          >
            My Numbers
          </Button>
          <Button
            variant="h6"
            component={RouterLink}
            to="/profile"
            onClick={toggleDrawer(false)}
            sx={ButtonStyle}
          >
            Profile
          </Button>
          <Button
            variant="h6"
            onClick={() => { handleLogout(); toggleDrawer(false)(); }}
            sx={ButtonStyle}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="h6"
            component={RouterLink}
            to="/signin"
            onClick={toggleDrawer(false)}
            sx={ButtonStyle}
          >
            Sign in
          </Button>
          <Button
            variant="h6"
            component={RouterLink}
            to="/signup"
            onClick={toggleDrawer(false)}
            sx={ButtonStyle}
          >
            Sign up
          </Button>
        </>
      )}
      {darkModeSwitch}
    </Box>
  );

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={toggleDrawer(true)} 
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}sx={{ '& .MuiPaper-root	' : {bgcolor:'primary.main'} }}>
        {drawerContent}
      </Drawer>

      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {userToken ? (
          <>
            <Button variant="h6" onClick={handleMenuOpen} sx={ButtonStyle}>
              {(userData.first_name && `Hello, ${userData.first_name}`) || 'Account'}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={MenuOpen}
              onClose={handleMenuClose}
              onMouseLeave={handleMenuClose}
              MenuListProps={{
                sx: {

                  bgcolor: 'background.secondary',
                },
              }}
              sx={menuStyle}
            >
              <MenuItem component={RouterLink} to="/mynumbers" onClick={handleMenuClose} sx={MenuButtonStyle}>
                My Numbers
              </MenuItem>
              <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose} sx={MenuButtonStyle}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }} sx={MenuButtonStyle}>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="h6"
              underline="none"
              component={RouterLink}
              to="/signin"
              sx={ButtonStyle}
            >
              {'Sign In'}
            </Button>
            <Button
              variant="h6"
              underline="none"
              component={RouterLink}
              to="/signup"
              sx={ButtonStyle}
            >
              {'Sign Up'}
            </Button>
          </>
        )}
        {darkModeSwitch}
      </Box>
    </>
  );
}

export default function AppAppBar() {
  const theme = useTheme();

  return (
    <>
      <MuiAppBar
        elevation={0}
        position="fixed"
        sx={{
          bgcolor: (theme) => alpha(theme.palette.primary.dark, .8),
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.mode === 'dark' 
          ? '0px 4px 20px rgba(0, 23, 173, 0.1)' 
          : '0px 4px 20px rgba(25, 118, 210, 0.3)',
        }}
      >
        <Toolbar sx={{ height: { xs: 64, sm: 70, }}}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ fontSize: 24 }}
          >
            {'Num2Verify'}
          </Link>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <AppBarControls />
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </>
  );
}
