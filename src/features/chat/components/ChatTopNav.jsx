import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'; 
import { ChevronRight } from '@material-ui/icons';
import Profile from '../../../common/components/Profile';


const ChatTopNav = (props) => (
  <AppBar color="inherit"
    position="fixed"
    className={clsx(props.classes.appBar, {
      [props.classes.appBarShift]: props.open})}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleDrawerOpen}
        edge="start"
        className={clsx(props.classes.menuButton, {
          [props.classes.hide]: props.open})}>
        <ChevronRight />
      </IconButton>
      <Typography variant="h6" noWrap>
        Chat
      </Typography>
      <Button style={{ marginLeft: 60 }}
        onClick={props.toggleTheme}>
        {props.theme.palette.type === 'dark' ?
          'Turn the lights on' : 'Turn the lights off'}
      </Button>
      <Profile user={props.user} />
    </Toolbar>
  </AppBar>
);

export default ChatTopNav;