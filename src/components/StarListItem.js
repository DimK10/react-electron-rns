import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { removeStar } from '../actions/stars';
import '../styles/StarListItem.css'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    fab: {
        margin: theme.spacing(0)
      },
      link: {
          color: "#FFFFFF"
      }
  }));

const StarListItem = (props) => {
        
        const classes = useStyles();

        const onRemove = () => {
            props.removeStar({ id: props.star.id });
        };

        const renderSecondValueSwitch = (props) => {
            switch (props.star.model) {
                case 'model':
                    return <Typography>Axes Ratio: {props.star.valueForSecondInput}</Typography>
                case 'gmass':
                    return <Typography>Gravitational Mass: {props.star.valueForSecondInput}</Typography>
                case 'rmass':
                    return <Typography>Rest Mass: {props.star.valueForSecondInput}</Typography>
                case 'omega':
                    return <Typography>Angular Velocity: {props.star.valueForSecondInput}</Typography>
                case 'jmoment':
                    return <Typography>Angular Momentum: {props.star.valueForSecondInput}</Typography>
                case 'static':
                    return undefined
                case 'kepler':
                    if(props.star.valueForSecondInput !== '') {
                        //Tolerance value is set
                        return <Typography>Tolerance: {props.star.valueForSecondInput}</Typography>
                    }
                    return undefined;
                case 'test':
                    return undefined;
                default:
                    return undefined;
            }
        };

        const renderLimitSwitch = (props) => {
            switch (props.star.limit) {
                case 'none':
                    return undefined;
                case 'limitEnergy':
                    return <Typography>Limit On Energy: {props.star.limitValue}</Typography>
                case 'limitSecondValue':
                    return <Typography>Limit on {props.star.labelForSecondInput}: {props.star.limitValue}</Typography>
                default:
                    return undefined;
            }
        };
        console.log(props.star);
        return (
            <div className="fabWrapper">
                <div className="expansionPanel">
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{props.star.starName}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.root}>
                                <Typography>Model: {props.star.model}</Typography>
                                <Typography>eos File Selected: {props.star.eosFile}</Typography>
                                {props.star.model !== 'test' && <Typography>Energy: {props.star.centralEnergyDensity}</Typography>}
                                {renderSecondValueSwitch(props)}
                                {renderLimitSwitch(props)}
                                {props.star.measurements !== '0' && props.star.model !== 'test' && <Typography>Individual Dots to measure: {props.star.measurements}</Typography>}
                                {/*props.star.model !== 'test' && <Typography>Readings Ignored: {(props.star.readingsIgnored).toString()}</Typography>*/}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <div className="buttons">
                    <div className="btn-edit">
                        <Fab color="secondary" aria-label="edit" className={classes.fab} size="small">
                            <Link to={`/edit/${props.star.id}`} className={classes.link}>
                                <EditIcon />
                            </Link>
                        </Fab>
                    </div>
                    <div className="btn-delete">
                        <Fab aria-label="delete" className={classes.fab} size="small" onClick={onRemove}>
                            <DeleteIcon />
                        </Fab>
                    </div>
                </div>
            </div>
    );
};

const mapDispatchToProps = (dispach, props) => ({
    removeStar: (data) => dispach(removeStar(data))
});


export default connect(undefined, mapDispatchToProps)(StarListItem);