import React from 'react';
import StarList from './StarList';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { sendModelsData } from '../actions/stars.js';
import { BallBeat } from 'react-pure-loaders';
import uuid from "uuid";
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

    
    postModels = () => {

        (async () => {
            let stars = {
                id: uuid(),
                starModels: [...this.props.stars].reverse() // For some reason, stars are saved in reverse order even with push
            };
            console.log('stars data:', stars);

            // this.props.parentCallback(true);

            this.setState({ loading: true });

            let data = await sendModelsData(stars);
            console.log('data send from server:', data);

            data.models.forEach((element, index) => {
                if(element !== 'succeeded') {
                    alert(`${this.props.stars[index].starName} has failed. Reason ${element.error}`);
                }
            });

            this.setState({ loading: false });

            this.props.history.push('/chart', { chartData: data.valuesForGraph })
        })();
        
    };

    // classes = useStyles();

    render() {
        return(
            <div className="StarDashboardPage-container">
                <div className="StarDashboardPage-wrapper">
                    
                    <StarList dataFromParent = {this.state.loading} />
                   
                    <div className="links"/*className={this.classes.links}*/>
                        <div className="btn-model">
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
                        <div className="btn-graph">
                            {
                                this.props.stars.length !== 0 
                                && 
                                !this.state.loading
                                &&
                                <Button variant="contained" onClick={this.postModels}>
                                    <Typography>Create Graph</Typography>
                                </Button>
                            }
                        </div>
                    </div>
                    <div className="balls">
                        {
                            this.state.loading
                            &&
                            <BallBeat
                                color={'#123abc'}
                                loading={this.state.loading}
                            />
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

const mapStateToProps = (state) => {
    return {
        stars: state.stars
    };
};

export default connect(mapStateToProps)(StarDashboardPage);