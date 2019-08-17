import React, { Component } from 'react';
import { connect } from 'react-redux';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import {
  CircularProgress,
  Container,
  Typography,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Tooltip,
  Fab,
  Box,
  SvgIcon,
} from '@material-ui/core';
import GoogleIcon from '../../assets/search.svg';
import MessageBar from '../../common/components/MessageBar';
import Company from '../../assets/company.png';
import * as config from '../../config/okta';
import { socialUserReceived } from './authActions';

function authState(state) {
  return {
    user: state.auth_.user
  };
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      email: '',
      password: '',
      message: null,
      authenticating: false,
      isOpen: false
    };
    this.oktaAuth = new OktaAuth({ url: props.baseUrl });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!(this.state.email && this.state.password)) {
      this.setState({
        isOpen: true,
        message: 'email and password are required'
      });
      return;
    }

    this.setState({ authenticating: true });
    this.oktaAuth.signIn({
      username: this.state.email,
      password: this.state.password
    })
      .then(async res => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          sessionToken: res.sessionToken,
          message: null,
          isOpen: false
        });
      })
      .catch(error => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          isOpen: true,
          message: 'Invalid email or password'
        });
      });
  }


  googleLogin = () => {
    this.props.auth._oktaAuth.token.getWithPopup({
      grantType: 'authorization_code',
      responseMode: 'fragment',
      responseType: 'code',
      scopes: ['openid', 'profile', 'email'],
      state: 'wwedft',
      nonce: 'YHKU',
      idp: config.GOOGLE_IDP,
    }).then(async tokenOrTokens => {
      const decodedToken =
        await this.oktaAuth.token.decode(tokenOrTokens[0].accessToken);
      const userInfo =
        await this.oktaAuth.token.getUserInfo(tokenOrTokens[0]);
      this.props.dispatch(socialUserReceived(userInfo));
      this.setState({
        sessionToken: decodedToken.signature
      });
    }).catch(console.error);
  }
  
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({
        sessionToken: this.state.sessionToken
      });
      return null;
    }

    const message = this.state.message ?
      <MessageBar
        horizontal="left"
        vertical="top"
        variant="error"
        message={this.state.message}
        open={this.state.isOpen}
        onClose={this.handleClose} /> : null;

    return (
      <Container component="main" maxWidth="xs">
        <div style={{
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <img height={150} width={150} src={Company} alt="gg" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {message}
          {this.state.authenticating ? <CircularProgress style={{ marginTop: 25 }} /> : null}
          <form onSubmit={this.handleSubmit} noValidate style={{
            width: '100%', // Fix IE 11 issue.
            marginTop: 10
          }}>
            <TextField required fullWidth autoFocus
              variant="outlined"
              margin="normal"
              id="email"
              value={this.state.email}
              label="Email Address"
              name="email"
              autoComplete="off"
              onChange={this.handleEmailChange} />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                margin: 3,
              }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
            </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Tooltip title="Sign In with Google">
            <Fab style={{ backgroundColor: "transparent" }}
              variant="round"
              size="small" onClick={this.googleLogin}
              disabled={false}>
            <img src={GoogleIcon} alt="google" height={45} width={45} />
            </Fab>
          </Tooltip>
        </Box>
      </Container>
    );
  }
}

export default connect(authState)(withAuth(LoginForm))