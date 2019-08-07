import React, { Component } from 'react';
import GuildsDarwer from './GuildsDrawer';
import withAuth from '@okta/okta-react/dist/withAuth';
import { connect } from 'react-redux';
import LoadingIndicator from '../../common/components/loading';
import * as Actions from './chatActions';
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
      const guilds = await databaseRef.ref('guilds').once('value');
      const guildNames = await Object.keys(guilds.val());
      this.setState({
        user,
        guilds: guildNames
      });
    })
    .catch(console.error);
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