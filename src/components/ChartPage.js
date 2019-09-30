import React, { useEffect } from 'react';
import Chart from 'chart.js';
import ReactFrappeChart from "react-frappe-charts";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';

export class ChartPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xValues: [],
            datasets: [], // For multiple plots
            colors: []
        };
    };

    componentWillMount() {
        // Add values for the data to be displayed
        // for (let i = 1; i <= this.props.location.state.chartData[0].M.length; i++) {
        //     this.setState((prevState) => ({ values: [...prevState.values, i] })); 
        // };
    
        // Try to covent data for x axis to strings
        //let chartData = this.props.location.state.chartData[0].e_c.map(String);
        // console.log('chartData:', chartData);
        
        // Multiple plots
        // (async () => {
        //     await this.setData();
        // })();
        // let chartData = [];
        // for (let i = 0; i < this.props.location.state.chartData[0].R_e.length; i++) {
        //     chartData = [...chartData, this.props.location.state.chartData[0].R_e];
        // };
        // chartData = chartData.map(String);
        let chartData = this.props.location.state.chartData[0].R_e.map(String);
        this.setState((prevState) => ({ xValues: [...prevState.xValues, ...chartData] }));
    
            for (let i = 0; i < this.props.location.state.chartData.length; i++) {
                this.setState((prevState) => ({ 
                    datasets: [...prevState.datasets, {
                        values: this.props.location.state.chartData[i].M
                    }],
                    colors: [...prevState.colors, randomColor().toString()]
                    }));
            };
    };

    componentDidMount() {
        console.log('state.values:', this.state.xValues);
        console.log('state.datasets:', this.state.datasets); 
        console.log('state.colors:', this.state.colors);
    };

    goBack = () => {
        this.props.history.push('/');
    };

    // setData = async () => {
    //     let chartData = this.props.location.state.chartData[0].M_0.map(String);
    //     this.setState((prevState) => ({ values: [...prevState.values, ...chartData] }));

    //     for (let i = 0; i < this.props.location.state.chartData.length; i++) {
    //         this.setState((prevState) => ({ 
    //             datasets: [...prevState.datasets, {
    //                 values: this.props.location.state.chartData[i].R_e
    //             }],
    //             colors: [...prevState.colors, randomColor()]
    //             }));
    //     };
    // };

    render(){
        return (
            <div>
                <ReactFrappeChart
                    type="line"
                    colors={this.state.colors}
                    axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                    height={550}
                    data={{
                        labels: this.state.xValues, // This is for x axis
                        datasets: this.state.datasets
                        // datasets: [{ 
                        //     name: "M", chartType: 'line',
                        //     values: this.props.location.state.chartData[0].M
                        // }] // y Axis
                    }}
                />
                <Button variant="contained" onClick={this.goBack}>
                    <Typography>Go Back To DashBoard</Typography>
                </Button> 
            </div>
        )
    }
};

// This might also work -- just need to use componentWillMount!
// export const ChartPage = (props) => {

//     useEffect(() => {
//         console.log('chartData:', props.location.state.chartData[0].e_c);
//     }, []);

//     return (
//      <div>
//         <p>{props.location.state.chartData[0].e_c}</p>
//         <ReactFrappeChart
//             type="line"
//             colors={["#21ba45"]}
//             axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
//             height={250}
//             data={{
//                 labels: ["1", "2", "3", "4"],
//                 datasets: [{ values: props.location.state.chartData[0].e_c }]
//             }}
//         />
//      </div>
//     );
//   }

//class ChartPage extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             datasets: [],
//             yAxes: []
//         };
//         this.chartRef = React.createRef();
//     }

//     componentDidMount = () => {
//         // Find out how many models are needed to make plots
//         const plotsNeeded = this.props.location.state.chartData.length;
//         console.log('plotsNeeded:', plotsNeeded);
        
//         let datasets = [];
//         let yAxes = [];
//         for (let i = 0; i < plotsNeeded; i++) {
//             let color = randomColor();
//             datasets = [ ...datasets, {
//                 label: i,
//                 borderColor: color,
//                 backgroundColor: color,
//                 fill: false,
//                 data: this.props.location.state.chartData[i].e_c,
//                 yAxisID: 'y-axis-' + i
//             }]


//             yAxes = [ ...yAxes, {
//                 type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
//                 display: true,
//                 id: 'y-axis-' + i,
//                 gridLines: {
//                     drawOnChartArea: false
//                 }
//             }];
//         };
//         console.log('datasets before setState:', datasets);
//         console.log('yAxes before setState:', yAxes);
        
        

//         // Add datasets and yAxes to state
//         // this.setState(({
//         //     datasets,
//         //     yAxes
//         // }));

//         // console.log('datasets after setState:',this.state.datasets);
//         // console.log('yAxes after setState:', this.state.yAxes);
        
//         this.updateCanvas(datasets, yAxes);
//     };

//     updateCanvas = (datasets = [], yAxes = []) => {

//         console.log('datasets in updateCanvas:', datasets);
//         console.log('yAxes in updateCanvas:', yAxes);
        
        
//         let lineChartData = {
//             labels: ['0', '10', '20', '30', '40'],
//             datasets
//         };

//         console.log('lineChartData with datasets:', lineChartData);
        


//         const ctx = this.refs.canvas.getContext('2d');
//         console.log('ctx:', ctx);

//         const chartOptions = {
//             data: {
//                 labels: ['0', '10', '20', '30', '40'],
//                 datasets
//             },
//             options: {
//                 responsive: true,
//                 hoverMode: 'index',
//                 stacked: false,
//                 title: {
//                     display: true,
//                     text: 'Test Chart M with e_c'
//                 },
//                 scales: {
//                     yAxes
//                 }
//             }
//         }

//         console.log('chartOptions:', chartOptions);
        
        
//         let chart = new Chart(ctx, chartOptions);
        
//         console.log('chart as data:', chart);
        
//     }
//     render() {
//         return (
//            <div>
//                 <p>In canvas</p>
//                 <canvas ref="canvas" width="600" height="500" />
//            </div>
//         );
//     }

// };

// const mapStateToProps = (state) => {
//     return {
//         chartData: state.chartData
//     };
// };

export default ChartPage;