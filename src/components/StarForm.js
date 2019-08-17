import React from 'react';
import '../styles/StarForm.css'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { removeStar } from '../actions/stars';


class StarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            /*
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
            */
            starName: props.star ? props.star.starName : '',
            centralEnergyDensity: props.star ? props.star.centralEnergyDensity : '',
            axesRatio: props.star ? props.star.axesRatio : '',
            mass: props.star ? props.star.mass : '',
            restMass: props.star ? process.star.restMass : '',
            angularVelocity: props.star ? props.star.angularVelocity : '',
            angularMomentum: props.star ? props.star.angularMomentum : '',
            tolerance: props.star ? props.star.tolerance : '',
            model: props.star ? props.star.model : 'model',
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
                /*
                starName: this.state.starName,
                energyOrMassValue: this.state.energyOrMassValue,
                model: this.state.model,
                radius: this.state.radius,
                energyOrMass: this.state.energyOrMass, //This might be removed
                measurements: parseInt(this.state.measurements),
                limit: this.state.limit,
                limitValue: this.state.limitValue,
                readingsIgnored: parseInt(this.state.readingsIgnored)
                */
                starName: this.state.starName,
                centralEnergyDensity: this.state.centralEnergyDensity,
                axesRatio: this.state.axesRatio,
                mass: this.state.mass,
                restMass: this.state.restMass,
                angularVelocity: this.state.angularVelocity,
                angularMomentum: this.state.angularMomentum,
                tolerance: this.state.tolerance,
                model: this.state.model,
                measurements: this.state.measurements,
                limit: this.state.limit,
                limitValue: this.state.limitValue,
                readingsIgnored: this.state.readingsIgnored,

            });
        }
    };

    onstarNameChange = (e) => {
        const starName = e.target.value;
        this.setState(() => ({ starName }));
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


    handleModelSelectChange = (e) => {
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

    handleLimitSelectChange = (e) => {
        if(e.target.value === 'limitEnergyOrMass') {
            this.setState(() => ({ limit: 'limitEnergyOrMass' }))
        }else if (e.target.value === 'limitRadius') {
            this.setState(() => ({ limit: 'limitRadius' }))
        }else {
            this.setState(() => ({ limit: null }))
        };
    };

    onClickBack = () => {        
        this.props.history.push('/');
    };

    handleOnRemoveModel = () => {
        this.props.removeStar({ id: this.props.star.id });
        this.props.history.push('/');
    }


    onEnergyChange = (e) => {
        const centralEnergyDensity = e.target.value;
        this.setState(() => ({ centralEnergyDensity }));
    };


    labelForSecondInput = () => {
        switch (this.state.model) {
            case 'model':
                return 'Axes Ratio Value'
            case 'gmass':
                return 'Mass Value'
            case 'rmass':
                return 'Rest Mass Value'
            case 'omega':
                return 'Angular Velocity Value'
            case 'jmoment':
                return 'Angular Momentum Value'
            case 'kepler':
                return 'Tolerance Value'
            default:
                return 'Axes Ratio Value'
        };
    };

    valueForSecondInput = () => {
        switch (this.state.model) {
            case 'model':
                return this.state.axesRatio
            case 'gmass':
                return this.state.mass
            case 'rmass':
                return this.state.restMass
            case 'omega':
                return this.state.angularVelocity
            case 'jmoment':
                return this.state.angularMomentum
            case 'kepler':
                return this.state.tolerance
            default:
                return this.state.axesRatio
        };
    };


    onSecondInputChange = (e) => {
        const value = e.target.value;

        switch (this.state.model) {
            case 'model':
                this.setState(() => ({ axesRatio: value }));
                break;
            case 'gmass':
                this.setState(() => ({ mass: value }));
                break;
            case 'rmass':
                this.setState(() => ({ restMass: value }));
                break;
            case 'omega':
                this.setState(() => ({ angularVelocity: value }));
                break;
            case 'jmoment':
                this.setState(() => ({ angularMomentum: value }));
                break;
            case 'kepler':
                this.setState(() => ({ tolerance: value }));
                break;
            default:
                this.setState(() => ({ axesRatio: value }));
                break;
        };
    };

    render() {
        return (
            <div>
                {this.state.error && <Typography color="error" variant="subtitle2">{this.state.error}</Typography>}
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
                        onChange={this.handleModelSelectChange}
                        
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
                        label="Central Energy Density Value"
                        placeholder="0"
                        margin="normal"
                        value={this.state.centralEnergyDensity}
                        onChange={this.onEnergyChange}
                    />
                    <TextField
                        id="standard-with-placeholder"
                        label={this.labelForSecondInput}
                        placeholder="0" 
                        margin="normal"
                        value={this.valueForSecondInput} 
                        onChange={this.onSecondInputChange}
                    />

                    <InputLabel htmlFor="age-helper">Select Limit</InputLabel>
                    <Select
                        value={this.state.limit}
                        onChange={this.handleLimitSelectChange}
                        
                    >
                        
                        <MenuItem value="none">No Limit Set</MenuItem>
                        <MenuItem value="limitEnergyOrMass">Set Limit on {this.state.energyOrMass}</MenuItem>
                        <MenuItem value="limitRadius">Set Limit on Radius</MenuItem>
                       
                    </Select>

                    {
                        this.state.limit !== 'none' 
                        && 
                        <TextField
                            id="standard-with-placeholder"
                            label={'Limit on ' + this.state.energyOrMass}
                            placeholder="0"
                            margin="normal"
                            value={this.state.limitValue === '0' ? '' : this.state.limitValue}
                            onChange={this.onLimitChange}
                        />
                        
                    }

                    <TextField
                        id="standard-with-placeholder"
                        label="How Many Measurements"
                        placeholder="0"
                        margin="normal"
                        value={this.state.measurements === '0' ? '' : this.state.measurements}
                        onChange={this.onNumberOfMeasurementsChange}
                    />
                    <TextField
                        id="standard-with-placeholder"
                        label="Readings to Ignore"
                        placeholder="0"
                        margin="normal"
                        value={this.state.readingsIgnored === '0' ? '' : this.state.readingsIgnored}
                        onChange={this.onReadingsIgnoredChange}
                    />
                   
                    
                    <Button type="submit" variant="contained" color="secondary">
                        {this.props.onEdit ? 'Edit Star' : 'Add Star'}
                    </Button>
                    <Button variant="contained" onClick={this.onClickBack}>
                        Back
                    </Button>
                    {
                        !this.props.onEdit
                        ? undefined
                        :   <Button variant="contained" onClick={this.handleOnRemoveModel}>
                                Remove Model
                            </Button>
                    }
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispach, props) => ({
    removeStar: (data) => dispach(removeStar(data))
});

export default connect(undefined, mapDispatchToProps)(StarForm);