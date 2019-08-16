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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    fabWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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

        return (
            <div className={classes.fabWrapper}>
                <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{props.star.starName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.root}>
                        {
                            props.star.energyOrMass === 'energy' ? (
                                <Typography>Energy: {props.star.energyOrMassValue}</Typography>
                            ) : (
                                <Typography>Mass: {props.star.energyOrMassValue}</Typography>
                            )
                        }
                        <Typography>Radius: {props.star.radius}</Typography>
                        <Typography>Model: {props.star.model}</Typography>
                        {props.star.limit !== 'none' && <Typography>Limit on {props.star.limit}: {props.star.limitValue}</Typography>}
                        {props.star.measurements !== 0 && <Typography>Individual Dots to measure: {props.star.measurements}</Typography>}
                        <Typography>Readings Ignored: {props.star.readingsIgnored}</Typography>
                        
                </ExpansionPanelDetails>
                </ExpansionPanel>
                <div>
                    <Fab color="secondary" aria-label="edit" className={classes.fab} size="small">
                        <Link to={`/edit/${props.star.id}`} className={classes.link}>
                            <EditIcon />
                        </Link>
                    </Fab>
                    <Fab aria-label="delete" className={classes.fab} size="small" onClick={onRemove}>
                        <DeleteIcon />
                    </Fab>
                </div>
            </div>
    );
};

const mapDispatchToProps = (dispach, props) => ({
    removeStar: (data) => dispach(removeStar(data))
});


export default connect(undefined, mapDispatchToProps)(StarListItem);



/*
        <div>
        <Link to={`/edit/${id}`}>
            <h3>Star: {starName}</h3>
        </Link>
        {energyOrMass === 'energy' ? (
            <p>Energy: {energyOrMassValue}</p>
        ) : (
            <p>Mass: {energyOrMassValue}</p>
        )}
        <p>Radius: {radius}</p>
        <p>Model: {model}</p>
        {limit !== 'none' && <p>Limit on {limit}: {limitValue}</p>}
        {measurements !== 0 && <p>Individual Dots to measure: {measurements}</p>}
        <p>Readings Ignored: {readingsIgnored}</p>
    </div>
    */
    