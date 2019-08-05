import React, { Component } from 'react';
import ChannelDarwer from './GuildsDrawer';
import withAuth from '@okta/okta-react/dist/withAuth';
import { connect } from 'react-redux';
import LoadingIndicator from '../../common/components/loading';
import * as Actions from './chatActions';

const chatState = (state)  => {
  return {
    currentGuild: state.chat.currentGuild
  };
}
const chatActions = {
  onGuildClicked: Actions.selectGuild
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.props.auth.getUser()
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(console.error);
  }

  render() {
    return this.state.user ? 
      <div>
        <ChannelDarwer {...this.state} {...this.props} />
      </div> :
      <div>
        <LoadingIndicator />
      </div>
  }
}

export default connect(chatState, chatActions)(withAuth(Chat));