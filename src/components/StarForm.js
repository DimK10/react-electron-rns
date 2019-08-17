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
            starName: props.star ? props.star.starName : '',
            centralEnergyDensity: props.star ? props.star.centralEnergyDensity : '',
            tolerance: props.star ? props.star.tolerance : '',
            labelForSecondInput: props.star ? props.star.labelForSecondInput : 'Axes Ratio',
            valueForSecondInput: props.star ? props.star.valueForSecondInput : '',
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

        if (( !this.state.starName || !this.state.centralEnergyDensity || !this.state.valueForSecondInput) && (!this.state.model === 'test' || !this.state.starName)){
            console.log('centralEnergyDensity', this.state.centralEnergyDensity);
            console.log('valueForSecondInput', this.state.valueForSecondInput);
            
            this.setState(() => ({ error: `Please provide a name, a value for Energy and a value for ${this.state.labelForSecondInput} ` }));
        } else {
            console.log('centralEnergyDensity value', this.state.centralEnergyDensity);
            console.log('second value', this.state.valueForSecondInput);

            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                starName: this.state.starName,
                centralEnergyDensity: this.state.centralEnergyDensity,
                tolerance: this.state.tolerance,
                labelForSecondInput: this.state.labelForSecondInput,
                valueForSecondInput: this.state.valueForSecondInput,
                model: this.state.model,
                measurements: this.state.measurements,
                limit: this.state.limit,
                limitValue: this.state.limitValue,
                readingsIgnored: this.state.readingsIgnored

            });
        }
    };

    onstarNameChange = (e) => {
        const starName = e.target.value;
        this.setState(() => ({ starName }));
    };

    handleModelSelectChange = (e) => {
        switch (e.target.value) {
            case 'model':
                this.setState((prevState) => ({
                    model: 'model', 
                    labelForSecondInput: 'Axes Ratio', 
                    valueForSecondInput: prevState.valueForSecondInput 
                }));
                break;
            case 'gmass':
                this.setState((prevState) => ({ 
                    model: 'gmass', 
                    labelForSecondInput: 'Mass', 
                    valueForSecondInput: prevState.valueForSecondInput 
                }));
                break;
            case 'rmass':
                this.setState((prevState) => ({ 
                    model: 'rmass', 
                    labelForSecondInput: 'Rest Mass', 
                    valueForSecondInput: prevState.valueForSecondInput 
                }));
                break;
            case 'omega':
                this.setState((prevState) => ({ 
                    model: 'omega', 
                    labelForSecondInput: 'Angular Velocity', 
                    valueForSecondInput: prevState.valueForSecondInput 
                }));
                break;
            case 'jmoment':
                this.setState((prevState) => ({ 
                    model: 'jmoment', 
                    labelForSecondInput: 'Angular Momentum', 
                    valueForSecondInput: prevState.valueForSecondInput 
                }));
                break;
            case 'static':
                this.setState(() => ({ model: 'static' }));
                break;
            case 'kepler':
                this.setState((prevState) => ({ 
                    model: 'kepler', 
                    labelForSecondInput: 'Tolerance',
                    valueForSecondInput: prevState.tolerance 
                }));
                break;
            case 'test':
                this.setState(() => ({ model: 'test' }));
                break;
            default:
                this.setState((prevState) => ({
                    model: 'model', 
                    labelForSecondInput: 'Axes Ratio', 
                    valueForSecondInput: prevState.valueForSecondInput 
                }));
                break;
        }
    };

    handleLimitSelectChange = (e) => {
        if(e.target.value === 'limitEnergy') {
            this.setState(() => ({ limit: 'limitEnergy' }))
        }else if (e.target.value === 'limitSecondValue') {
            this.setState(() => ({ limit: 'limitSecondValue' }))
        }else {
            this.setState(() => ({ limit: 'none' }))
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

    onSecondInputChange = (e) => {
        const valueForSecondInput = e.target.value;
        this.setState(() => ({ valueForSecondInput }));
    };

    onLimitChange = (e) => {
        const limitValue = e.target.value;
        
        this.setState(() => ({ limitValue }));
    };

    onNumberOfMeasurementsChange = (e) => {
        const measurements = e.target.value;
        this.setState(() => ({ measurements }));
    };

    onReadingsIgnoredChange = (e) => {
        const readingsIgnored = e.target.value;
        this.setState(() => ({ readingsIgnored }))
    };

    render() {
        if(this.props.star){
            console.log('props.star', this.props.star);
            
        }
        
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
                        disabled={this.state.model === 'test'}
                        label="Energy Value"
                        placeholder="0"
                        margin="normal"
                        value={this.state.centralEnergyDensity}
                        onChange={this.onEnergyChange}
                    />
                    <TextField
                        id="standard-with-placeholder"
                        disabled={this.state.model === 'test' || this.state.model === 'static'}
                        label={this.state.labelForSecondInput}
                        placeholder="0" 
                        margin="normal"
                        value={this.state.valueForSecondInput} 
                        onChange={this.onSecondInputChange}
                    />

                    <InputLabel htmlFor="age-helper">Select Limit</InputLabel>
                    <Select
                        value={this.state.limit}
                        disabled={this.state.model === 'test'}
                        onChange={this.handleLimitSelectChange}
                        
                    >
                        
                        <MenuItem value="none">No Limit Set</MenuItem>
                        <MenuItem value="limitEnergy">Set Limit on Energy</MenuItem>
                        <MenuItem value="limitSecondValue">Set Limit on {this.state.labelForSecondInput}</MenuItem>
                       
                    </Select>

                    {
                        this.state.limit !== 'none' 
                        && 
                        <TextField
                            id="standard-with-placeholder"
                            disabled={this.state.model === 'test'}
                            label={this.state.limit === 'limitEnergy' ? 'Limit on Energy' : 'Limit on ' + this.state.labelForSecondInput}
                            placeholder="0"
                            margin="normal"
                            value={this.state.limitValue === '0' ? '' : this.state.limitValue}
                            onChange={this.onLimitChange}
                        />
                        
                    }

                    <TextField
                        id="standard-with-placeholder"
                        disabled={this.state.model === 'test'}
                        label="Measurements"
                        placeholder="0"
                        margin="normal"
                        value={this.state.measurements === '0' ? '' : this.state.measurements}
                        onChange={this.onNumberOfMeasurementsChange}
                    />
                    <TextField
                        id="standard-with-placeholder"
                        disabled={this.state.model === 'test'}
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