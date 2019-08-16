import React from 'react';
import StarList from './StarList';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
      links: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
  }));

const StarDashboardPage = () => {
    
    const classes = useStyles();
    
    return(
        <div>
            <div className={classes.links}>
                <NavLink to="/create" activeClassName="is-active">
                    <Fab variant="extended" color="primary" aria-label="add" className={classes.fab}>
                        <AddIcon />  Add A Model
                    </Fab>
                </NavLink>
            </div>
            <StarList />
        </div>
    );
};

export default StarDashboardPage;