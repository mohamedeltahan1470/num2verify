import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/Privacy';
import Profile from './pages/profile';
import About from './pages/About.jsx';
import AppAppBar from './modules/components/AppAppBar';
import AppFooter from './modules/components/AppFooter';
import ActivateAccount from './pages/ActivateAccount';
import ProtectedRoute from './ProtectedRoute';
import CountryList from './pages/CountryList';
import CountryNumbers from './pages/CountryNumbers';
import UserNumbers from './pages/userNumbers';
import NumberMessages from './pages/NumberMessages.jsx';
import { Box } from '@mui/material';
import theme from './modules/theme.jsx'
import { useAuth } from './context.jsx'
import { ThemeProvider } from '@emotion/react'


function App({children }) {
  const { themeType } = useAuth();

  return (
    <ThemeProvider theme = {theme(themeType)}>

    <Box sx={{display: 'flex', flexDirection:'column', minHeight: '100vh', bgcolor: 'background.default', color:'text.primary'}}>
    <BrowserRouter>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<ProtectedRoute checkType={'IsLoggedIn'} > <Home /> </ProtectedRoute>} />
          <Route path="/signin" element={<ProtectedRoute checkType={'IsLoggedIn'} > <SignIn /> </ProtectedRoute> } />
          <Route path="/signup" element={<ProtectedRoute checkType={'IsLoggedIn'}> <SignUp /> </ProtectedRoute>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProtectedRoute checkType={'IsNotLoggedIn'}> <Profile /> </ProtectedRoute>} />
          <Route path="/countries" element={<ProtectedRoute checkType={'IsNotLoggedIn'}> <CountryList /> </ProtectedRoute>} />
          <Route path="/mynumbers" element={<ProtectedRoute checkType={'IsNotLoggedIn'}> <UserNumbers /> </ProtectedRoute>} />
          <Route path="/numbermessages/:numberid" element={<ProtectedRoute checkType={'IsNotLoggedIn'}> <NumberMessages /> </ProtectedRoute>} />
          <Route path="/countrynumbers/:countryid" element={<ProtectedRoute checkType={'IsNotLoggedIn'}> <CountryNumbers /> </ProtectedRoute>} />
          <Route path="/activate" element={<ActivateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Box sx={{ flex: '1 0 auto', bgcolor: 'inherit'}}>
          {children}
        </Box>
        <AppFooter />
      </BrowserRouter>
    </Box>
    </ThemeProvider>

  );
}

export default App;
