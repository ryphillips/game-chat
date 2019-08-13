import React from 'react';
import clsx from 'clsx';

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
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        Chat
      </Typography>
      <Button style={{ marginLeft: 60 }}
        onClick={props.toggleTheme}>
        {props.theme.palette.type === 'dark' ?
          'Turn the lights on' : 'Turn the lights off'}
      </Button>
    </Toolbar>
  </AppBar>
);

export default ChatTopNav;