import React from 'react';
import '../styles/StarForm.css'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { removeStar } from '../actions/stars';
import { getEosFiles } from '../actions/stars';


class StarForm extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            starName: props.star ? props.star.starName : '',
            centralEnergyDensity: props.star ? props.star.centralEnergyDensity : '0.0',
            labelForSecondInput: props.star ? props.star.labelForSecondInput : 'Axes Ratio',
            valueForSecondInput: props.star ? props.star.valueForSecondInput : '0.0', //Check if this is viable as a solution
            eosFiles: [],
            eosFile: props.star ? props.star.eosFile : 'eosC',
            model: props.star ? props.star.model : 'model',
            measurements: props.star ? props.star.measurements : '0',
            limit: props.star ? props.star.limit : 'none',
            limitValue: props.star ? props.star.limitValue : '0',
            // readingsIgnored: props.star ? props.star.readingsIgnored : false, This is not needed -- will lead to problems in program -- removing
            errors: []
        }
    };

    componentDidMount() {
        this._isMounted = true;

        getEosFiles()
        .then((eosFiles) => {
            if(this._isMounted){
                console.log(eosFiles[0]);
                this.setState(() => ({ eosFiles }));
            }
        });
    }

    componentDidUpdate() {
        getEosFiles()
        .then((eosFiles) => {
            if(this._isMounted){
                this.setState(() => ({ eosFiles }));
            }
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    };

    validate = (
        starName, 
        centralEnergyDensity, 
        labelForSecondInput = '', 
        valueForSecondInput = '0.0',
        model,
        measurements = '0', 
        limit = 'none', 
        limitValue = '0'
        ) => {
            const errors = [];

            if(starName === '') {
                errors.push('Star Model\'s name cannot be empty!');
            };
            if(model !== 'test' && ( centralEnergyDensity === '0.0' || centralEnergyDensity === '')){ // SOS Check for all values!  
                errors.push('Central Energy Density can\'t be empty!');
            };

            if(model !== 'static' && model !== 'kepler' && model !== 'test'){
                if(valueForSecondInput === '0.0'){
                    errors.push(`${labelForSecondInput} can\'t be empty!`);
                };

                if(limit !== 'none' && limitValue === '0'){
                    errors.push(`You have set limit to ${limit === 'limitEnergy' ? 'Energy' : this.state.labelForSecondInput}! Please provide a limit value!`);
                };

                if(limit !== 'none' && measurements === '0'){
                    errors.push('You need to specify how many measurements (outputs) should the rns produce!');
                };
            } else {
                // Push errors for static and kepler models
                if(model !== 'test' && limit !== 'none' && limitValue === '0'){
                    errors.push(`You have set limit to ${limit}! Please provide a limit value!`);
                };

                if(model !== 'test' && limit !== 'none' && measurements === '0'){
                    errors.push('You need to specify how many measurements (outputs) should the rns produce!');
                };
            };

            return errors;
    };
   
    onSubmit = (e) => {
        e.preventDefault();

        // Re-basing the whole validation
        const errors = this.validate(
            this.state.starName, 
            this.state.centralEnergyDensity, 
            this.state.labelForSecondInput, 
            this.state.valueForSecondInput,
            this.state.model,
            this.state.measurements, 
            this.state.limit, 
            this.state.limitValue);

            if(errors.length === 0) {
                // No errors -- submit data
                if(this.state.model === 'test'){
                    this.props.onSubmit({
                        starName: this.state.starName,
                        eosFile: this.state.eosFile,
                        model: this.state.model
                    });
                } else {
                    this.props.onSubmit({
                        starName: this.state.starName,
                        centralEnergyDensity: this.state.centralEnergyDensity,
                        labelForSecondInput: this.state.labelForSecondInput,
                        valueForSecondInput: this.state.valueForSecondInput,
                        eosFile: this.state.eosFile,
                        model: this.state.model,
                        measurements: this.state.measurements === '' ? '0' : this.state.measurements,
                        limit: this.state.limit === '' ? '0' : this.state.limit,
                        limitValue: this.state.limitValue === '' ? '0' : this.state.limitValue,
                    });
                };
            } else {
                this.setState({ errors });
            };

        // if(this.state.model === 'test' && !this.state.starName){
        //     this.setState(() => ({ error: 'Please provide a name for the test model' }));
        // }else if(this.state.model === 'kepler' && (!this.state.starName || !this.state.centralEnergyDensity)){
        //     this.setState(() => ({ error: 'Please provide a name, and a value for central Energy Density.' }));
        // }else if (this.state.model !== 'test' && this.state.model !== 'kepler' && (!this.state.starName || !this.state.centralEnergyDensity || !this.state.valueForSecondInput)){
        //     this.setState(() => ({ error: `Please provide a name, a value for Energy and a value for ${this.state.labelForSecondInput} ` }));
        // }else if (this.state.model !== 'test' && this.state.model !== 'kepler' && this.state.limit !== 'none' && (!this.state.starName || !this.state.centralEnergyDensity || !this.state.valueForSecondInput || this.state.limitValue === '0' || this.state.measurements === '0')){
        //     //Need to check if user selected limit, and so make measurements required too
        //     this.setState(() => ({ error: `Please provide a name, a value for Energy and a value for ${this.state.labelForSecondInput} and for limit and for measurements!` }));
        //     // if(this.state.limit !== 'none' && (this.state.limitValue === '0' || this.state.measurements === '0')) {
        //     //     this.setState(() => ({ error:  `Please provide a name, a value for Energy, a value for ${this.state.labelForSecondInput} and for limit and measurements!`}));
        //     // }else{
        //     //     this.setState(() => ({ error: `Please provide a name, a value for Energy and a value for ${this.state.labelForSecondInput} ` }));
        //     // }
        // }else if (this.state.model === 'test') {
        //     this.setState(() => ({ error: '' }));
        //     this.props.onSubmit({
        //         starName: this.state.starName,
        //         eosFile: this.state.eosFile,
        //         model: this.state.model
        //     });
        // }else {
        //     this.setState(() => ({ error: '' }));
        //     this.props.onSubmit({
        //         starName: this.state.starName,
        //         centralEnergyDensity: this.state.centralEnergyDensity,
        //         labelForSecondInput: this.state.labelForSecondInput,
        //         valueForSecondInput: this.state.valueForSecondInput,
        //         eosFile: this.state.eosFile,
        //         model: this.state.model,
        //         measurements: this.state.measurements === '' ? '0' : this.state.measurements,
        //         limit: this.state.limit === '' ? '0' : this.state.limit,
        //         limitValue: this.state.limitValue === '' ? '0' : this.state.limitValue,
        //         readingsIgnored: this.state.readingsIgnored
        //     });
        // };
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
                    // valueForSecondInput: prevState.valueForSecondInput 
                    centralEnergyDensity: '0.0', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0'
                }));
                break;
            case 'gmass':
                this.setState((prevState) => ({ 
                    model: 'gmass', 
                    labelForSecondInput: 'Mass', 
                    // valueForSecondInput: prevState.valueForSecondInput 
                    centralEnergyDensity: '0.0', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0'
                }));
                break;
            case 'rmass':
                this.setState((prevState) => ({ 
                    model: 'rmass', 
                    labelForSecondInput: 'Rest Mass', 
                    // valueForSecondInput: prevState.valueForSecondInput 
                    centralEnergyDensity: '0.0', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0'
                }));
                break;
            case 'omega':
                this.setState((prevState) => ({ 
                    model: 'omega', 
                    labelForSecondInput: 'Angular Velocity', 
                    // valueForSecondInput: prevState.valueForSecondInput 
                    centralEnergyDensity: '0.0', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0'
                }));
                break;
            case 'jmoment':
                this.setState((prevState) => ({ 
                    model: 'jmoment', 
                    // labelForSecondInput: 'Angular Momentum', 
                    // valueForSecondInput: prevState.valueForSecondInput 
                    centralEnergyDensity: '0.0', 
                    labelForSecondInput: 'Angular Momentum', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0'
                }));
                break;
            case 'static':
                this.setState(() => ({ 
                    model: 'static', 
                    centralEnergyDensity: '0.0', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0' 
                }));
                break;
            case 'kepler':
                this.setState((prevState) => ({ 
                    model: 'kepler', 
                    centralEnergyDensity: '0.0',
                    labelForSecondInput: 'Tolerance',
                    valueForSecondInput: '0.0',
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0' 
                }));
                break;
            case 'test':
                this.setState(() => ({ 
                    model: 'test',
                    centralEnergyDensity: '0.0', 
                    valueForSecondInput: '0.0', 
                    measurements: '0', 
                    limit: 'none', 
                    limitValue: '0' 
                }));
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
            this.setState(() => ({ limit: 'limitEnergy', limitValue: '0', measurements: '0' }))
        }else if (e.target.value === 'limitSecondValue') {
            this.setState(() => ({ limit: 'limitSecondValue', limitValue: '0', measurements: '0' }))
        }else {
            this.setState(() => ({ limit: 'none', limitValue: '0', measurements: '0' }))
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
        
        this.setState(() => ({ limitValue,  }));
    };

        onNumberOfMeasurementsChange = (e) => {
        const measurements = e.target.value;
        this.setState(() => ({ measurements }));
    };

    onReadingsIgnoredChange = (e) => {
        const readingsIgnored = e.target.value;
        this.setState(() => ({ readingsIgnored }))
    };

    handleEosFIleSelectChange = (e) => {
        const eosFile = e.target.value;    
        this.setState(() => ({ eosFile }));
    }; 

    // handleReadingsChange = () => {
    //     this.setState((prevState) => ({ readingsIgnored: !prevState.readingsIgnored }));
    // }

    render() {
        return (
            <div>
                {/* this.state.error && <Typography color="error" variant="subtitle2">{this.state.errors}</Typography> */}
                {
                    this.state.errors.length !== 0 
                    && 
                    <ul className="errorList">
                        {
                            this.state.errors.map(error => {
                                return <li key={error}><Typography color="error" variant="subtitle1">❌ {error}</Typography></li>
                            })
                        }
                    </ul>
                }
                <form onSubmit={this.onSubmit} className="formContainer">
                    <TextField
                        id="standard-with-placeholder"
                        label="Star Model Name"
                        placeholder="Add a Name"
                        margin="normal"
                        value={this.state.starName}
                        onChange={this.onstarNameChange}
                    />
                    
                    <div className = "wrapper1">
                        <InputLabel>Choose EOS file</InputLabel>
                        <Select
                            disabled={this.state.eosFiles[0] === 'No eos files in folder!'}
                            value={this.state.eosFile}
                            onChange={this.handleEosFIleSelectChange}
                        >     
                            {
                                this.state.eosFiles.map((eosFileName) => {
                                    return <MenuItem key={eosFileName} value={eosFileName}>{eosFileName}</MenuItem>
                                }) 
                            }
                        </Select> 
                    </div>    
                    
                    <InputLabel>Model Type</InputLabel>
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
                    {
                        this.state.model !== 'test' 
                        &&
                        <TextField
                            id="standard-with-placeholder"
                            label="Energy Value"
                            placeholder="ex. 2e14"
                            margin="normal"
                            value={this.state.centralEnergyDensity === '0.0' ? '' : this.state.centralEnergyDensity}
                            onChange={this.onEnergyChange}
                        />
                    }
                    {
                        this.state.model !== 'test'
                        &&
                        this.state.model !== 'static'
                        &&
                        this.state.model !== 'kepler'
                        &&
                        <TextField
                            id="standard-with-placeholder"
                            // error={!this.state.valueForSecondInput.match(/^[+-]?\d+(?:\.\d*(?:[eE][+-]?\d+)?)?$/)}
                            error = {!this.state.valueForSecondInput.match(/\d+(?:\.\d*(?:[eE][+-]?\d+)?)?$/)}
                            label={this.state.labelForSecondInput}
                            placeholder="ex. 2e14" 
                            margin="normal"
                            value={this.state.valueForSecondInput === '0.0' ? '' : this.state.valueForSecondInput} 
                            onChange={this.onSecondInputChange}
                        />
                    }
                    {
                        /*Case needed for tolerance in kepler model*/
                        this.state.model === 'kepler'
                        &&
                        <TextField
                            id="standard-with-placeholder"
                            label={this.state.labelForSecondInput + '-Not Required.'}
                            placeholder="10e-4" 
                            margin="normal"
                            value={this.state.valueForSecondInput} 
                            onChange={this.onSecondInputChange}
                        />
                    }
                    {
                        this.state.model !== 'test'
                        &&
                        <div className="wrapper2">
                            <InputLabel htmlFor="age-helper">Select Limit</InputLabel>
                            <Select
                                value={this.state.limit}
                                onChange={this.handleLimitSelectChange}
                                
                            >
                                
                                <MenuItem value="none">No Limit Set</MenuItem>
                                <MenuItem value="limitEnergy">Set Limit on Energy</MenuItem>
                                {this.state.model !== 'static' && <MenuItem value="limitSecondValue">Set Limit on {this.state.labelForSecondInput}</MenuItem>}                           
                            </Select>
                        </div>
                    }

                    

                    {
                        this.state.limit !== 'none'
                        &&
                        this.state.test !== 'test' 
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
                    {
                        (
                            this.state.model !== 'test'
                            && 
                            this.state.limit !== 'none'
                        )
                        &&
                        <TextField
                            id="standard-with-placeholder"
                            label="Measurements"
                            placeholder="0"
                            margin="normal"
                            value={this.state.measurements === '0' ? '' : this.state.measurements}
                            onChange={this.onNumberOfMeasurementsChange}
                        />
                    }
                    {/*
                        this.state.model !== 'test'
                        &&
                        <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.readingsIgnored}
                            onChange={this.handleReadingsChange}
                            color="primary"
                          />
                        }
                        label="Suppress the relative difference in the coordinate equatorial radius from one iteration to the next?"
                      />
                    */}
                    <Button type="submit" variant="contained" color="secondary">
                        {this.props.onEdit ? 'Edit Star' : 'Add Star'}
                    </Button>
                    {
                        !this.props.onEdit
                        ? undefined
                        :   <Button variant="contained" onClick={this.handleOnRemoveModel}>
                                Remove Model
                            </Button>
                    }
                    <Button variant="contained" onClick={this.onClickBack}>
                        Back
                    </Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispach, props) => ({
    removeStar: (data) => dispach(removeStar(data))
});

export default connect(undefined, mapDispatchToProps)(StarForm);