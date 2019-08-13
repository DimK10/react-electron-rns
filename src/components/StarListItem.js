import React from 'react';
import { Link } from 'react-router-dom';

const StarListItem = ({
        id,
        starName,
        energyOrMassValue,
        model, 
        radius, 
        energyOrMass, 
        measurements,
        limit, 
        limitValue,
        readingsIgnored 
    }) => (
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
);



export default StarListItem;
