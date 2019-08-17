import React from 'react';
import { connect } from 'react-redux';
import StarListItem from './StarListItem';
import selectStars from '../selectors/stars';
// import { saveDataToDb } from '../actions/stars.js';
import Typography from '@material-ui/core/Typography';
import '../styles/StarList.css'

const StarList = (props) => {
    
    // saveDataToDb(props.stars);

    return (
        <div className="container">
            {
                props.stars.length !== 0 
                ? (
                    <Typography variant="h4">Star Models List</Typography>
                ) : (
                    <Typography variant="h4">Add Star Models to Start...</Typography>
                )
            }
            {props.stars.map((star) => {
                return <StarListItem key={star.id} star={star} />
            })}
        </div>
    )

};

const mapStateToProps = (state) => {
    return {
        stars: selectStars(state.stars, state.filters)
    };
};


export default connect(mapStateToProps)(StarList);
