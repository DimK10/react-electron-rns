import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StarListItem from './StarListItem';
import selectStars from '../selectors/stars';
import uuid from 'uuid';
import Typography from '@material-ui/core/Typography';
import '../styles/StarList.css'


export class StarList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
    };


    render() {
        return (
            <div className="Starlist-container">
                {
                    this.props.stars.length !== 0 && !this.props.dataFromParent
                    ? (
                        <Typography variant="h4">Star Models List</Typography>
                    ) : (
                        !this.props.dataFromParent 
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
                        !this.props.dataFromParent 
                        &&
                        [...this.props.stars].reverse().map((star) => {
                            return <StarListItem key={star.id} star={star} />
                        })
                    }
                </div>
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
