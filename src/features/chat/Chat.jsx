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
      guilds: []
    };
  }

  componentDidMount() {
    this.props.auth.getUser().then(async user => {
      databaseRef.ref('users').orderByChild('email')
        .equalTo(user.email)
        .once('value', (snapshot) => {
          const fireUser = Object.values(snapshot.val())[0];
          const guildNames = Object.values(fireUser.guilds);
          this.setState({
            user,
            guilds: guildNames
          });
        });
    }).catch(console.error);
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