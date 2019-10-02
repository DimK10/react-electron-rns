import React from 'react';
import ReactFrappeChart from "react-frappe-charts";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import randomColor from 'randomcolor';
import '../styles/ChartPage.css';
import { MenuItem } from '@material-ui/core';


export class ChartPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xValues: [],
            datasets: [], // For multiple plots
            colors: [],
            xAxis: 'R_e', // Default value
            yAxis: 'M',
            allValues: [
                'e_c',
                'M',
                'M_0',
                'R_e',
                'Omega',
                'Omega_p',
                'TW',
                'cJGM_sun2',
                'I',
                'h_plus',
                'h_minus',
                'Z_p',
                'Z_f',
                'Z_b',
                'omega_cOmega',
                'r_e',
                'r_pR_e'
            ]
        };
    };
    

    componentWillMount() {
        // let chartData = this.props.location.state.chartData[0].R_e.map(String).reverse();
        // this.setState((prevState) => ({ xValues: [...prevState.xValues, ...chartData] }));
        this.changeXAxis(true);
        this.changeYAxis(true);
    };

    componentDidMount() {
        console.log('state.values:', this.state.xValues);
        console.log('state.datasets:', this.state.datasets); 
        console.log('state.colors:', this.state.colors);
    };

    handleXValueSelectChange = (e) => {
        const xAxis = e.target.value;
        this.setState({ xAxis }, () => {
            this.changeXAxis(false);
        });
    };

    handleYValueSelectChange = (e) => {
        const yAxis = e.target.value;
        this.setState({ yAxis }, () => {
            this.changeYAxis(false);
        });
    };
    goBack = () => {
        this.props.history.push('/');
    };

    changeXAxis = (shouldReverseData) => {
        // Due to M and R_e come reversed from the outputs for some reason, i added a value, if true the data will be reversed
        // If false, they won't. This must be done, so that the chart won't look different on each re-render

        let chartData = [];
        switch (this.state.xAxis) {
            case 'e_c':
                chartData = this.props.location.state.chartData[0].e_c.map(String);
                break;
            case 'M':
                shouldReverseData
                ?
                chartData = this.props.location.state.chartData[0].M.reverse().map(String)
                :
                chartData = this.props.location.state.chartData[0].M.map(String);
                break;
            case 'M_0':
                chartData = this.props.location.state.chartData[0].M_0.map(String);
                break;
            case 'R_e':
                shouldReverseData 
                ? 
                chartData = this.props.location.state.chartData[0].R_e.reverse().map(String) 
                : 
                chartData = this.props.location.state.chartData[0].R_e.map(String);
                break;
            case 'Omega':
                chartData = this.props.location.state.chartData[0].Omega.map(String);
                break;
            case 'Omega_p':
                chartData = this.props.location.state.chartData[0].Omega_p.map(String);
                break;
            case 'TW':
                chartData = this.props.location.state.chartData[0].TW.map(String);
                break;
            case 'cJGM_sun2':
                chartData = this.props.location.state.chartData[0].cJGM_sun2.map(String);
                break; 
            case 'I':
                chartData = this.props.location.state.chartData[0].I.map(String);
                break; 
            case 'h_plus':
                chartData = this.props.location.state.chartData[0].h_plus.map(String);
                break; 
            case 'h_minus':
                chartData = this.props.location.state.chartData[0].h_minus.map(String);
                break; 
            case 'Z_p':
                chartData = this.props.location.state.chartData[0].Z_p.map(String);
                break; 
            case 'Z_f':
                chartData = this.props.location.state.chartData[0].Z_f.map(String);
                break; 
            case 'Z_b':
                chartData = this.props.location.state.chartData[0].Z_b.map(String);
                break; 
            case 'omega_cOmega':
                chartData = this.props.location.state.chartData[0].omega_cOmega.map(String);
                break;
            case 'r_e':
                chartData = this.props.location.state.chartData[0].r_e.map(String);
                break; 
            case 'r_pR_e':
                chartData = this.props.location.state.chartData[0].r_pR_e.map(String);
                break; 
        
            default:
                break;
        };

        this.setState({ xValues: [...chartData] });
    };

    changeYAxis = (shouldReverseData) => {
        this.setState({ datasets: [] });
        for (let i = 0; i < this.props.location.state.chartData.length; i++) {
            switch (this.state.yAxis) {
                case 'e_c':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].e_c
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'M':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: shouldReverseData ? this.props.location.state.chartData[i].M.reverse() : this.props.location.state.chartData[i].M
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'M_0':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].M_0
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'R_e':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: shouldReverseData ? this.props.location.state.chartData[i].R_e.reverse() : this.props.location.state.chartData[i].R_e.reverse()
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'Omega':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].Omega
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'Omega_p':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].Omega_p
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'TW':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].TW
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'cJGM_sun2':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].cJGM_sun2
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;  
                case 'I':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].I
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'h_plus':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].h_plus
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'h_minus':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].h_minus
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'Z_p':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].Z_p
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'Z_f':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].Z_f
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'Z_b':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].Z_b
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'omega_cOmega':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].omega_cOmega
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'r_e':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].r_e
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
                case 'r_pR_e':
                    this.setState((prevState) => ({ 
                        datasets: [...prevState.datasets, {
                            name: 'model ' + (i + 1),
                            values: this.props.location.state.chartData[i].r_pR_e
                        }],
                        colors: [...prevState.colors, randomColor().toString()]
                        }));
                    break;
            
                default:
                    break;
            };
        };
    };

    render(){
        return (
            <div className="container">
                <div className="selects">
                    <InputLabel>Change X Axis</InputLabel>
                    <Select
                        value={this.state.xAxis}
                        onChange={this.handleXValueSelectChange}
                    >     
                    {
                        this.state.allValues.filter(value => value !== this.state.yAxis).map((value) => {
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
                        }) 
                    }
                    </Select> 
                    <InputLabel>Change Y Axis</InputLabel>
                    <Select
                        value={this.state.yAxis}
                        onChange={this.handleYValueSelectChange}
                    >     
                    {
                        this.state.allValues.filter(value => value !== this.state.xAxis).map((value) => {
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
                        }) 
                    }
                    </Select> 
                </div>
                <div className="chart">
                    <ReactFrappeChart
                        title = "Chart With M in Y Axis and R_e in X Axis:"
                        type="line"
                        colors={this.state.colors}
                        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                        height={550}
                        data={{
                            labels: this.state.xValues, // This is for x axis
                            datasets: this.state.datasets
                        }}
                    />
                    <Button variant="contained" onClick={this.goBack}>
                        <Typography>Go Back To DashBoard</Typography>
                    </Button> 
                </div>
            </div>
        )
    }
};

export default ChartPage;