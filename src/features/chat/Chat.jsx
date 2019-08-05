import React, { Component } from 'react';
import Profile from '../../common/components/Profile';
import ChannelDarwer from './ChannelDrawer';
import withAuth from '@okta/okta-react/dist/withAuth';
import LoadingIndicator from '../../common/components/loading';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }

  componentDidMount() {
    this.props.auth.getUser()
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(console.error)
  }

  render() {
    return this.state.user ? 
    <div>
      <ChannelDarwer />
      <Profile user={this.state.user} />
      </div>
      : <LoadingIndicator />
  }
}

export default withAuth(Chat);