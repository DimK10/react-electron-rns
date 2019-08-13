import React from 'react';
import '../styles/StarForm.css'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

export default class StarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            

            starName: props.star ? props.star.starName : '',
            energyOrMassValue: props.star ? props.star.energyOrMassValue : '',
            model: props.star ? props.star.model : 'model',
            radius: props.star ? props.star.radius : '',
            energyOrMass: props.star ? props.star.energyOrMass : 'energy',
            measurements: props.star ? props.star.measurements : '0',
            limit: props.star ? props.star.limit : 'none',
            limitValue: props.star ? props.star.limitValue : '0',
            readingsIgnored: props.star ? props.star.readingsIgnored : '0',
            error: ''
        }
    };
   
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.energyOrMassValue || !this.state.radius) {
            this.setState(() => ({ error: `Please provide a value for ${this.state.energyOrMass} and a value for radius ` }));
        } else {
            console.log('energyOrMassValue', this.state.energyOrMassValue);
            console.log('radius value', this.state.radius);

            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                starName: this.state.starName,
                energyOrMassValue: this.state.energyOrMassValue,
                model: this.state.model,
                radius: this.state.radius,
                energyOrMass: this.state.energyOrMass, //This might be removed
                measurements: parseInt(this.state.measurements),
                limit: this.state.limit,
                limitValue: this.state.limitValue,
                readingsIgnored: parseInt(this.state.readingsIgnored)
            });
        }
    };

    onstarNameChange = (e) => {
        const starName = e.target.value;
        this.setState(() => ({ starName }));
    };

    onEnergyOrMassValueChange = (e) => {
        const energyOrMassValue = e.target.value;
        this.setState(() => ({ energyOrMassValue }));
    };

    onNumberOfMeasurementsChange = (e) => {
        const measurements = e.target.value;
        this.setState(() => ({ measurements }));
    };

    onEnergyMassLimitChange = (e) => {
        const limitValue = e.target.value;
        this.setState(() => ({ limit: 'energy', limitValue }));
    };

    onLimitChange = (e) => {
        const limitValue = e.target.value;
        
        this.setState(() => ({ limitValue }));
    };

    onLimitRadiusCheckboxChange = () => {

        if(this.state.limit === null){
            this.setState(() => ({ limit: 'radius' }));
        }else {
            this.setState(() => ({ limit: null }));
        }
    };
    onReadingsIgnoredChange = (e) => {
        const readingsIgnored = e.target.value;
        this.setState(() => ({ readingsIgnored }))
    };

    extractEnergyOrMassValue = () => {
        if(this.state.energyOrMass === 'energy') {
            return this.state.energyValue
        } else {
            return this.state.massValue
        };
    }

    onRadiusChange = (e) => {
        const radius = e.target.value;
        this.setState(() => ({ radius }));
    };

    handleSelectChange = (e) => {
        switch (e.target.value) {
            case 'model':
                this.setState(() => ({ model: 'model', energyOrMass: 'energy' }));
                break;
            case 'gmass':
                this.setState(() => ({ model: 'gmass', energyOrMass: 'mass' }));
                break;
        
            default:
                    this.setState(() => ({ model: null }))
                break;
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit} className="container">
                    <TextField
                        id="standard-with-placeholder"
                        label="Star Model Name"
                        placeholder="Add a Name"
                        margin="normal"
                        value={this.state.starName}
                        onChange={this.onstarNameChange}
                    />
                    <InputLabel htmlFor="age-helper">Model Type</InputLabel>
                    <Select
                        value={this.state.model}
                        onChange={this.handleSelectChange}
                        
                    >
                        
                        <MenuItem value="model">model</MenuItem>
                        <MenuItem value="gmass">gmass</MenuItem>
                        <MenuItem value="rmass">rmass</MenuItem>
                        <MenuItem value="omega">omega</MenuItem>
                        <MenuItem value="jmoment">jmoment</MenuItem>
                        <MenuItem value="static">static</MenuItem>
                        <MenuItem value="kepler">kepler</MenuItem>
                        <MenuItem value="test">test</MenuItem>
                    </Select>

                    <TextField
                        id="standard-with-placeholder"
                        label={this.state.energyOrMass === 'energy' ? 'Energy Value' : 'Mass Value'}
                        placeholder={this.state.energyOrMass === 'energy' ? 'Energy' : 'Mass'}
                        margin="normal"
                        value={this.state.energyOrMassValue}
                        onChange={this.onEnergyOrMassValueChange}
                    />
                    <TextField
                        id="standard-with-placeholder"
                        label="Radius Value"
                        placeholder="Radius" 
                        margin="normal"
                        value={this.state.radius} 
                        onChange={this.onRadiusChange}
                    />
                   
                    <select 
                        value={this.state.limit}
                        onChange = {(e) => {
                            if(e.target.value === 'limitEnergyOrMass') {
                                this.setState(() => ({ limit: 'limitEnergyOrMass' }))
                            }else if (e.target.value === 'limitRadius') {
                                this.setState(() => ({ limit: 'limitRadius' }))
                            }else {
                                this.setState(() => ({ limit: null }))
                            };
                        }}
                    >
                        <option value="none">No Limit Set</option>
                        <option value="limitEnergyOrMass">Set Limit on {this.state.energyOrMass}</option>
                        <option value="limitRadius">Set Limit on Radius</option>
                    </select>
                    <p>Number of Individual Dots to Measure (Default is zero):</p>
                    {
                        this.state.limit !== 'none' 
                        && 
                        <input 
                            type="text" 
                            placeholder={'Limit on ' + this.state.energyOrMass} 
                            value={this.state.limitValue}
                            onChange={this.onLimitChange}
                        />
                    }
                    <input 
                        type="text" 
                        placeholder="0" 
                        value={this.state.measurements}
                        onChange={this.onNumberOfMeasurementsChange}
                    />
                    
                    <p>How many first readings to ignore (default is zero):</p>
                    <input 
                        type="text" 
                        placeholder="0"
                        value={this.state.readingsIgnored} 
                        onChange={this.onReadingsIgnoredChange}
                    />
                    <button>{this.props.onEdit ? 'Edit Star' : 'Add Star'}</button>
                </form>
            </div>
        )
    }
}