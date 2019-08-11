import React, { Component } from 'react';
import GuildsDarwer from './GuildsDrawer';
import withAuth from '@okta/okta-react/dist/withAuth';
import LoadingIndicator from '../../common/components/loading';
import { databaseRef } from '../../data/firebase';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      guildIds: []
    };
  }

  componentDidMount() {
    this.getUserGuilds();
  }

  getUserGuilds = async () => {
    const oktaUser = await this.props.auth.getUser();
    const usersGuilds = databaseRef.ref('users')
      .orderByChild('email')
      .equalTo(oktaUser.email);

    usersGuilds.once('value', (snapshot) => {
      if (!snapshot.exists()) {
        this.setState({ user: oktaUser });
        return;
      }
      const firebaseUser = Object.values(snapshot.val())[0];
      this.setState({
        user: oktaUser,
        guilds: firebaseUser.guilds
      });
    });
  }

  render() {
    return this.state.user ?
      <div>
        <GuildsDarwer {...this.state} {...this.props} />
      </div> :
      <div>
        <LoadingIndicator />
      </div>
  }
}

export default withAuth(Chat);