import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    alignment: {
      alignItems: 'center'
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200
        }
      }
    },
    fab: {
        margin: theme.spacing(1),
        alignItems: 'center'
      },
      links: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
  }));
  

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static" className={classes.alignment}>
              <Toolbar>
                  <Typography variant="h6" color="inherit">
                      Rapidly Rotating Neutron Star Model Constructor
                  </Typography>
                  <div className={classes.search}>
                      <div className={classes.searchIcon}>
                      <SearchIcon />
                      </div>
                      <InputBase
                      placeholder="Search…"
                      classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      />
                  </div>
              </Toolbar>
          </AppBar>
          <div className={classes.links}>
            <NavLink to="/create" activeClassName="is-active">
                  <Fab variant="extended" color="primary" aria-label="add" className={classes.fab}>
                      <AddIcon />  Add A Model
                  </Fab>
              </NavLink>
              <NavLink to="/" activeClassName="is-active">Dashboard</NavLink>
          </div>
       </div>
    )};


export default Header;