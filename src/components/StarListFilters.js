import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByName, sortByModel } from '../actions/filters';


class StarListFilters extends React.Component{
   
    

    render() {
        return (
            <div>
                <input
                    type="text" value={this.props.filters.text}
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value))
                    }} 
                />
                <select 
                    value={this.props.filters.sortBy} 
                        onChange = {(e) => {
                            if(e.target.value === 'name'){
                                this.props.dispatch(sortByName())
                            }else if (e.target.value === 'model') {
                                this.props.dispatch(sortByModel())
                            }
                        }}
                    >
                    <option value="name">Star Name</option>
                    <option value="model">Selected Model</option>
                </select>
            </div>
        )    
    }
};


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

export default connect(mapStateToProps)(StarListFilters);