import React, { Component } from 'react';
import GuildsContainer from './GuildsContainer';
import withAuth from '@okta/okta-react/dist/withAuth';
import LoadingIndicator from '../../common/components/loading';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  componentDidMount() {
    this.props.auth.getUser()
      .then(user => this.setState({ user }))
      .catch(console.error);
  }
  render() {
    return this.state.user ?
      <div><GuildsContainer {...this.state} {...this.props} /></div> :
      <div><LoadingIndicator /></div>
  }
}

export default withAuth(Chat);