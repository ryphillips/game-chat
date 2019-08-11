import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 160;
export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    display: 'flex',
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 102
  },
  drawerPaper: {
    background: '',
    width: drawerWidth,
    position: 'fixed'
  },
  paperAnchorLeft: {
    position: 'fixed',
    marginLeft: theme.spacing(9) + 2
  },
  content: {
    width: '100%',
    paddingLeft: theme.spacing(8) + 1,
  },
  toolbar: theme.mixins.toolbar,
}));
