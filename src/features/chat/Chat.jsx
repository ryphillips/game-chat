import React from 'react';
import GuildsContainer from './GuildsContainer';
import withAuth from '@okta/okta-react/dist/withAuth';
import LoadingIndicator from '../../common/components/loading';

function Chat(props) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    (function getUser() {
      props.auth.getUser()
        .then(user_ => setUser(user_))
        .catch(console.error);
    })();
  }, []);
  return !user ? <LoadingIndicator /> :
    <GuildsContainer user={user} {...props} />;
}

export default withAuth(Chat);