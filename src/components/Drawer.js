import React from 'react';

//material ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


//icon

import StoreIcon from '@material-ui/icons/Store';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



import {
  Route,
  Link,
} from "react-router-dom";


//pages 
import Products from './Products'
import Cart from './Cart'
import Wishlist from './Wishlist'
import Branches from './GetDirection'
import About from './About'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#fff"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#23689b"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    backgroundColor: "#fff"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#fff"
  },
  link: {
    textDecoration: "none",
    color: 'black'
  },

}));

export default function DrawerPage() {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isActive = (value) => {
    if (window.location.hash == value)
      return true
    else
      return false
  };


  return (
    <div className={classes.root}>

      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
           Shopping Krd
          </Typography>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />

        <List>


          <Link to="/" className={classes.link}>
            <ListItem button key="Products" selected={isActive('#/')}>
              <ListItemIcon> <StoreIcon /> </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>

          <Link to="/Cart" className={classes.link}>
            <ListItem button key="Cart" selected={isActive('#/Cart')}>
              <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
          </Link>

          <Link to="/Wishlist" className={classes.link}>
            <ListItem button key="Wishlist" selected={isActive('#/Wishlist')}>
              <ListItemIcon> <FavoriteIcon /> </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItem>
          </Link>

          {/* <Link to="/Branches" className={classes.link}>
            <ListItem button key="Branches" selected={isActive('#/Branches')}>
              <ListItemIcon> <RoomIcon /> </ListItemIcon>
              <ListItemText primary="Branches" />
            </ListItem>
          </Link> */}

          <Link to="/About" className={classes.link}>
            <ListItem button key="About" selected={isActive('#/About')}>
              <ListItemIcon> <InfoIcon /> </ListItemIcon>
              <ListItemText primary="About us" />
            </ListItem>
          </Link>

      
        </List>

      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/" exact component={Products} />
        <Route path="/Cart" exact component={Cart} />
        <Route path="/Wishlist" exact component={Wishlist} />
        <Route path="/Branches" exact component={Branches} />
        <Route path="/About" exact component={About} />
      </main>

    </div >
  );
}