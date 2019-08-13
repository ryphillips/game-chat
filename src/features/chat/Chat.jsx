import React, { Component } from 'react';
import GuildsDarwer from './GuildsDrawer';
import withAuth from '@okta/okta-react/dist/withAuth';
import LoadingIndicator from '../../common/components/loading';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      guildIds: []
    };
  }
  componentDidMount() {
    this.props.auth.getUser(user => {
      this.setState({ user });
    });
  }

  render() {
    return this.state.user ?
      <div><GuildsDarwer {...this.state} {...this.props} /></div> :
      <div><LoadingIndicator /></div>
  }
}

export default withAuth(Chat);