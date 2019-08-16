import React from 'react';
import { connect } from 'react-redux';
import StarForm from './StarForm';
import { editStar } from '../actions/stars';


export class EditStarPage extends React.Component{
    onSubmit = (star) => {
      this.props.editStar(this.props.star.id, star); 
      this.props.history.push('/');
    };
  
    render() {
      return (
          <StarForm
            star={this.props.star}
            onSubmit={this.onSubmit}
            history={this.props.history}
            onEdit={true}
          />
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
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditStarPage);
  
