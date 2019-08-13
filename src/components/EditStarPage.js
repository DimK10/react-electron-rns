import React from 'react';
import { connect } from 'react-redux';
import StarForm from './StarForm';
import { editStar, removeStar } from '../actions/stars';


export class EditStarPage extends React.Component{
    onSubmit = (star) => {
      this.props.editStar(this.props.star.id, star); 
      this.props.history.push('/');
    };
  
    onRemove = () => {
      this.props.removeStar({ id: this.props.star.id });
      this.props.history.push('/');
    }
  
    render() {
      return (
        <div>
          <StarForm
            star={this.props.star}
            onSubmit={this.onSubmit}
          />
          <button onClick={this.onRemove}>Remove</button>
        </div>
      );
    }
  };
  
  const mapStateToProps = (state, props) => {
    return {
      star: state.stars.find((star) => star.id === props.match.params.id)
    };
  };
  
  const mapDispatchToProps = (dispach, props) => ({
      editStar: (id, expense) => dispach(editStar(id, expense)),
      removeStar: (data) => dispach(removeStar(data))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditStarPage);
  
