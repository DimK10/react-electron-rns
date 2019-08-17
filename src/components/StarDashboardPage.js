import React from 'react';
import StarList from './StarList';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
      links: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      navlink: {
          textDecoration: 'none'
      }
  }));

const StarDashboardPage = () => {
    
    const classes = useStyles();
    
    return(
        <div>
            <div className={classes.links}>
                <NavLink to="/create" activeClassName="is-active" className={classes.navlink}>
                    <Fab variant="extended" color="primary" aria-label="add">
                        <AddIcon /> 
                        <Typography> Add A Model</Typography>
                    </Fab>
                </NavLink>
            </div>
            <StarList />
        </div>
    );
};

export default StarDashboardPage;