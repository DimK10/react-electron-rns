import React from 'react';
import { connect } from 'react-redux';
import StarListItem from './StarListItem';
import selectStars from '../selectors/stars';
import { sendModelsData, deleteData } from '../actions/stars.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import uuid from 'uuid';
import '../styles/StarList.css'

const StarList = (props) => {
    
    // saveDataToDb(props.stars);

    const postModels = () => {

        (async () => {
            let stars = {
                id: uuid(),
                starModels: props.stars
            };
            console.log('stars data:', stars);
            
            let data = await sendModelsData(stars);
            console.log('data send from server:', data);

            data.models.forEach((element, index) => {
                if(element !== 'succeeded') {
                    alert(`${props.stars[index].starName} has failed. Reason ${element.error}`);
                }
            });
            
            await deleteData(data.id);

        })();
        
    };

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
            {
                props.stars.map((star) => {
                    return <StarListItem key={star.id} star={star} />
                })
            }
            {
                props.stars.length !== 0
                &&
                <Button variant="contained" onClick={postModels}>
                    <Typography>Create Graph</Typography>
                </Button>
            }
        </div>
    )

};

const mapStateToProps = (state) => {
    return {
        stars: selectStars(state.stars, state.filters)
    };
};


export default connect(mapStateToProps)(StarList);
