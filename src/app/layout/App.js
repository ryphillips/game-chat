import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Home from '../../features/home/Home';
import Login from '../../features/auth/Login';
import Protected from '../../Protected';
import Chat from '../../features/chat/Chat';
import * as OKTA from '../../config/okta';

library.add(fab);

function onAuthRequired({ history }) {
  history.push('/login');
}

const App = () => {
  const [theme, setTheme] = useState({
    palette: {
      type: "dark"
    }
  });

  const toggleDarkTheme = () => {
    const newPaletteType =
      theme.palette.type === "dark" ? "light" : "dark";
    setTheme({
      palette: {
        type: newPaletteType
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
          <Route path='/' exact={true} render={() => <Home toggleTheme={toggleDarkTheme} />} />
          <SecureRoute path='/protected' component={Protected} />
          <SecureRoute path='/chat' render={() => <Chat toggleTheme={toggleDarkTheme} />} />
          <Route path='/login' render={() => <Login baseUrl={OKTA.BASE_URL} />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
      <CssBaseline />
    </MuiThemeProvider>
  );
}


export default App;