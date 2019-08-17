import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import Default from '../../assets/discorddefault.png';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    right: 50,
  },
  avatar: {
    width: 40,
    height: 40,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  name: {
   marginBottom: -1
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const user = {
    name: props.user ? props.user.name || props.user.email : 'Anon',
    avatar: props.user ? props.user.avatar || Default : Default,
    bio: props.user.email
  };
  return (
    <div {...rest}
      className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings" />
        <div className={classes.details}>  
      <Typography
        className={classes.name}
        variant="h6">
        {user.name}
      </Typography>
      <Typography variant="subtitle2">
        {user.bio}
      </Typography>
      </div>
    </div>
  );
};

export default Profile;