import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StarListItem from './StarListItem';
import selectStars from '../selectors/stars';
import { sendModelsData } from '../actions/stars.js';
import uuid from 'uuid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BallBeat } from 'react-pure-loaders';
import '../styles/StarList.css'


export class StarList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
    };

    postModels = () => {

        (async () => {
            let stars = {
                id: uuid(),
                starModels: [...this.props.stars].reverse() // For some reason, stars are saved in reverse order even with push
            };
            console.log('stars data:', stars);

            this.props.parentCallback(true);
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


    render() {
        return (
            <div className="Starlist-container">
                {
                    this.props.stars.length !== 0 && !this.state.loading
                    ? (
                        <Typography variant="h4">Star Models List</Typography>
                    ) : (
                        !this.state.loading 
                        ?
                        (
                            <Typography variant="h4">Add Star Models to Start...</Typography>
                        ) 
                        : 
                        (
                            <Typography variant="h4">Loading Graph. Please be patient!</Typography>
                        )
                    )
                }
                <div className="listOfModels">
                    {
                        !this.state.loading
                        &&
                        [...this.props.stars].reverse().map((star) => {
                            return <div className="model"><StarListItem key={star.id} star={star} /></div>
                        })
                    }
                </div>
                {/* Move the below button to starDashboadPage */}
                {
                    this.props.stars.length !== 0 
                    && 
                    !this.state.loading
                    &&
                    <Button variant="contained" onClick={this.postModels}>
                        <Typography>Create Graph</Typography>
                    </Button>
                }
                {
                    this.state.loading
                    &&
                    <BallBeat
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                }
            </div>
        );
    }
}



// const StarList = (props) => {
    
//     // saveDataToDb(props.stars);

//     const postModels = () => {

//         (async () => {
//             let stars = {
//                 id: uuid(),
//                 starModels: [...props.stars].reverse() // For some reason, stars are saved in reverse order even with push
//             };
//             console.log('stars data:', stars);
            
//             let data = await sendModelsData(stars);
//             console.log('data send from server:', data);

//             data.models.forEach((element, index) => {
//                 if(element !== 'succeeded') {
//                     alert(`${props.stars[index].starName} has failed. Reason ${element.error}`);
//                 }
//             });

//             props.history.push('/chart', { chartData: data.valuesForGraph })
//         })();
        
//     };

//     return (
//         <div className="container">
//             {
//                 props.stars.length !== 0 
//                 ? (
//                     <Typography variant="h4">Star Models List</Typography>
//                 ) : (
//                     <Typography variant="h4">Add Star Models to Start...</Typography>
//                 )
//             }
//             {
//                 [...props.stars].reverse().map((star) => {
//                     return <StarListItem key={star.id} star={star} />
//                 })
//             }
//             {
//                 props.stars.length !== 0
//                 &&
//                 <Button variant="contained" onClick={postModels}>
//                     <Typography>Create Graph</Typography>
//                 </Button>
//             }
//         </div>
//     )

// };

const mapStateToProps = (state) => {
    return {
        stars: selectStars(state.stars, state.filters)
    };
};

export default withRouter(connect(mapStateToProps)(StarList));
