import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import ChannelsContainer from '../ChannelsContainer';
import ToggleDisplay from '../../../common/components/toggleDisplay';
import {
  List,
  Drawer,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  Forum
} from '@material-ui/icons';

const GuildsContent = props => {
  const {
    classes,
    open,
    handleDrawerClose,
    guilds,
  } = props;
  const theme = useTheme();
  const keys = Object.keys(guilds);
  const guildsContent = Object.values(guilds);
  
  const guildTabs = guildsContent.map((guild, i) => {
    const currKey = keys[i];
    return (
      <ListItem button key={currKey}
        onClick={() => props.onGuildClicked(currKey)}
        selected={props.currentGuild === currKey} >
        <ListItemIcon>
          <Forum />
        </ListItemIcon>
        <ListItemText primary={guild} />
      </ListItem>
    );
  });
  const currGuildContent = keys.map((guildId) => (
    <React.Fragment key={guildId} >
      {props.currentGuild !== guildId ? null :
        <ToggleDisplay show={props.currentGuild === guildId}>
          <ChannelsContainer user={props.user}
            currentGuild={props.currentGuild} />
        </ToggleDisplay>}
    </React.Fragment>
  ));
  return (
    <React.Fragment>
      <Drawer variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })
        }}
        open={open}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ?
              <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {guildTabs}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {currGuildContent}
      </main>
    </React.Fragment>
  );
};

export default GuildsContent;