

const createArgumentsForEngine = (cmd, starModel) => {

    switch (starModel.model) {
        case 'model':
            cmd += ` -e ${starModel.centralEnergyDensity}` 
                    + `${starModel.limit == 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
                    + ` -r ${starModel.valueForSecondInput}`
                    + `${starModel.limit == 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
                    + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
                    // + `${starModel.readingsIgnored ? ' -d 0' : ''}` This is not possible due to regex catching all the uneccecary values -- removing
                    + ' -d 0'
                    
            console.log('cmd for model:', cmd);
            return cmd;

        case 'gmass':
            cmd += ` -e ${starModel.centralEnergyDensity}` 
                    + `${starModel.limit == 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
                    + ` -m ${starModel.valueForSecondInput}`
                    + `${starModel.limit == 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
                    + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
                    // + `${starModel.readingsIgnored ? ' -d 0' : ''}`
                    + ' -d 0'
            console.log('cmd for model:', cmd);
            return cmd;
        case 'rmass':
            cmd += ` -e ${starModel.centralEnergyDensity}`
            + `${starModel.limit === 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
            + ` -z ${starModel.valueForSecondInput}`
            + `${starModel.limit === 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
            + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
            + ' -d 0'

            console.log('cmd for model:', cmd);
            return cmd;
        case 'omega':
            cmd += ` -e ${starModel.centralEnergyDensity}`
            + `${starModel.limit === 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
            + ` -o ${starModel.valueForSecondInput}`
            + `${starModel.limit === 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
            + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
            + ' -d 0'
            
            console.log('cmd for model:', cmd);
            return cmd;

        case 'jmoment':
            cmd += ` -e ${starModel.centralEnergyDensity}`
            + `${starModel.limit === 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
            + ` -j ${starModel.valueForSecondInput}`
            + `${starModel.limit === 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
            + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
            + ' -d 0'
            
            console.log('cmd for model:', cmd);
            return cmd;

        case 'static':
            cmd += ` -e ${starModel.centralEnergyDensity}`
            + `${starModel.limit === 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
            + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
            + ' -d 0'
            
            console.log('cmd for model:', cmd);
            return cmd;

        case 'kepler':
            cmd += ` -e ${starModel.centralEnergyDensity}`
            + `${starModel.limit === 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
            + `${starModel.labelForSecondInput === 'Tolerance' ? ` -b ${starModel.valueForSecondInput}` : ''}`
            + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
            + ' -d 0'
            
            console.log('cmd for model:', cmd);
            return cmd;

        case 'test':
            // Nothing additional needs to be passed for test model, except the -d 0 flag for not useful values
            cmd+= ' -d 0';
            console.log('cmd for model:', cmd);
            return cmd;

            default:
            break;
    }
}

module.exports = createArgumentsForEngine;
    
