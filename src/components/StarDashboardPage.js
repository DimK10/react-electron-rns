import React from 'react';
import StarList from './StarList';
import { NavLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import '../styles/StarDashBoardPage.css';



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

class StarDashboardPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
    };
    updateLoading = (loading) => {
        this.setState({ loading  });
    };

    // classes = useStyles();

    render() {
        return(
            <div className="StarDashboardPage-container">
                <div className="StarDashboardPage-wrapper">
                    <div className="models">
                        <StarList parentCallback = {this.updateLoading} />
                    </div>
                    <div className="links"/*className={this.classes.links}*/>
                    {
                        !this.state.loading
                        &&
                        <NavLink to="/create" activeClassName="is-active" className="navlink"/*className={this.classes.navlink}*/>
                            <Fab variant="extended" color="primary" aria-label="add">
                                <AddIcon /> 
                                <Typography> Add A Model</Typography>
                            </Fab>
                        </NavLink>
                    }
                    </div>
                    
                </div>
            </div>
            
                
        );
    }
  };

// const StarDashboardPage = () => {
    
//     const classes = useStyles();
    
//     return(
//         <div>
//             <div className={classes.links}>
//                 <NavLink to="/create" activeClassName="is-active" className={classes.navlink}>
//                     <Fab variant="extended" color="primary" aria-label="add">
//                         <AddIcon /> 
//                         <Typography> Add A Model</Typography>
//                     </Fab>
//                 </NavLink>
//             </div>
//             <StarList />
//         </div>
//     );
// };

export default StarDashboardPage;