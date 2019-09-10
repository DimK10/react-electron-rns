

const createArgumentsForEngine = (cmd, starModel) => {

    switch (starModel.model) {
        case 'model':
            cmd += ` -e ${starModel.centralEnergyDensity}` 
                    + `${starModel.limit == 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
                    + ` -r ${starModel.valueForSecondInput}`
                    + `${starModel.limit == 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
                    + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
                    + `${starModel.readingsIgnored ? ' -d 0' : ''}`
                    
            console.log('cmd for model:', cmd);
            return cmd;

        case 'gmass':
            cmd += ` -e ${starModel.centralEnergyDensity}` 
                    + `${starModel.limit == 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
                    + ` -m ${starModel.valueForSecondInput}`
                    + `${starModel.limit == 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
                    + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
                    + `${starModel.readingsIgnored ? ' -d 0' : ''}`
            console.log('cmd for model:', cmd);
            return cmd;    

        default:
            break;
    }
}

module.exports = createArgumentsForEngine;
    
