import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import Home from '../../features/home/Home';
import Login from '../../features/auth/Login';
import Chat from '../../features/chat/Chat';
import * as OKTA from '../../config/okta';
import grey from '@material-ui/core/colors/grey';


function onAuthRequired({ history }) {
  history.push('/login');
}
const App = () => {
  const [theme, setTheme] = useState({
    palette: {
      type: "light",
    }
  });
  const toggleDarkTheme = () => {
    const newPaletteType =
      theme.palette.type === "dark" ? "light" : "dark";
    setTheme({
      palette: {
        type: newPaletteType,
      }
    });
  };

  const currentTheme = createMuiTheme(theme);
  return (
    <MuiThemeProvider theme={currentTheme}>
      <Router>
        <Security issuer={OKTA.ISSUER}
          client_id={OKTA.CLIENT_ID}
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired} >
          <Route path='/' exact={true} render={() => 
            <Home toggleTheme={toggleDarkTheme} />} />
          <SecureRoute path='/chat' render={() => 
            <Chat toggleTheme={toggleDarkTheme} theme={theme} />} />
          <Route path='/login' render={() => 
            <Login baseUrl={OKTA.BASE_URL} />} />
          <Route path='/implicit/callback' 
            component={ImplicitCallback} />
        </Security>
      </Router>
      <CssBaseline />
    </MuiThemeProvider>
  );
}

export default App;