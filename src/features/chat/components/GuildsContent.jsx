import React from 'react';
import {
  List,
  Drawer,
  Divider,
  IconButton,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const GuildsContent = props => {
  const {
    classes,
    open,
    handleDrawerClose,
    guildTabs,
    guildContent,
  } = props;
  const theme = useTheme();

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
        {guildContent}
      </main>
    </React.Fragment>
  );
};

export default GuildsContent;