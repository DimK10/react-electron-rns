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
import { getEosFiles } from '../actions/stars';


class StarForm extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            starName: props.star ? props.star.starName : '',
            centralEnergyDensity: props.star ? props.star.centralEnergyDensity : '',
            labelForSecondInput: props.star ? props.star.labelForSecondInput : 'Axes Ratio',
            valueForSecondInput: props.star ? props.star.valueForSecondInput : '',
            eosFiles: [],
            eosFile: props.star ? props.star.eosFile : 'eosC',
            model: props.star ? props.star.model : 'model',
            measurements: props.star ? props.star.measurements : '0',
            limit: props.star ? props.star.limit : 'none',
            limitValue: props.star ? props.star.limitValue : '0',
            readingsIgnored: props.star ? props.star.readingsIgnored : '0',
            error: ''
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
    }
   
    onSubmit = (e) => {
        e.preventDefault();

        
        if(this.state.model === 'test' && !this.state.starName){
            this.setState(() => ({ error: 'Please provide a name for the test model' }));
        }else if (this.state.model !== 'test' && (!this.state.starName || !this.state.centralEnergyDensity || !this.state.valueForSecondInput)){
            this.setState(() => ({ error: `Please provide a name, a value for Energy and a value for ${this.state.labelForSecondInput} ` }));
        }else if (this.state.model === 'test') {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                starName: this.state.starName,
                eosFile: this.state.eosFile,
                model: this.state.model
            });
        }else {
            this.setState(() => ({ error: '' }));
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
                readingsIgnored: this.state.readingsIgnored  === '' ? '0' : this.state.readingsIgnored
            });
        };
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
                    valueForSecondInput: prevState.valueForSecondInput 
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

    handleEosFIleSelectChange = (e) => {
        const eosFile = e.target.value;    
        this.setState(() => ({ eosFile }));
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
                    {
                        this.state.model !== 'test'
                        &&
                        <div className = "wrapper1">
                            <InputLabel>Choose EOS file</InputLabel>
                            <Select
                                disabled={this.state.eosFiles[0] == 'No eos files in folder!'}
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
                    }
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
                            placeholder="0"
                            margin="normal"
                            value={this.state.centralEnergyDensity}
                            onChange={this.onEnergyChange}
                        />
                    }
                    {
                        this.state.model !== 'test'
                        &&
                        this.state.model !== 'static'
                        &&
                        <TextField
                            id="standard-with-placeholder"
                            label={this.state.labelForSecondInput}
                            placeholder="0" 
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
                        this.state.model !== 'test'
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
                    {
                        this.state.model !== 'test'
                        &&
                        <TextField
                            id="standard-with-placeholder"
                            disabled={this.state.model === 'test'}
                            label="Readings to Ignore"
                            placeholder="0"
                            margin="normal"
                            value={this.state.readingsIgnored === '0' ? '' : this.state.readingsIgnored}
                            onChange={this.onReadingsIgnoredChange}
                        />
                    }
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