import React from 'react';
import { connect } from 'react-redux';
import StarForm from './StarForm';
import Typography from '@material-ui/core/Typography';
import { addStar } from '../actions/stars';
import '../styles/AddStarPage.css';


class AddStarPage extends React.Component {

    onSubmit =  (star) => {
        this.props.addStar(star); 
        this.props.history.push('/');
      };
    render(){
        return(
           <div className="container">
                <Typography variant="h5">
                    Add a New Star Model
                </Typography>
                <StarForm
                    onSubmit={this.onSubmit}
                    history={this.props.history}
                    onEdit={false}
                />
           </div>  
        );
    };
};


const mapDispatchToProps = (dispatch) => ({
    addStar: (star) => dispatch(addStar(star))
});

export default connect(undefined, mapDispatchToProps)(AddStarPage);