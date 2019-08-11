import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import Button from '@material-ui/core/Button';
import LoadingIndicator from '../../common/components/loading';
import { databaseRef } from '../../data/firebase';

export default withAuth(
class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { authenticated: null, user: null };
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication()
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      const user = await this.props.auth.getUser();
      this.setState({
        authenticated,
        user
      });
    }
  }

  render() {
    if (this.state.authenticated === null) {
      return <LoadingIndicator />;
    }

    const button = this.state.authenticated ?
      <button onClick={() => { this.props.auth.logout() }}>Logout</button> :
      <button onClick={() => { this.props.auth.login() }}>Login</button>;

    return (
      <div>
        <h1>hello world {this.state.user ? this.state.user.name : ''}</h1>
        <Link to='/'>Home</Link><br />
        <Link to='/protected'>Protected</Link><br />
        <Link to='/chat'>Chat</Link><br/>
        {button}
        <Button onClick={this.props.toggleTheme} >
          Toggle theme
        </Button>
      </div>
    );
  }
});

