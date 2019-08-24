const path = require('path');


const connectToEngine = (starModels) => {
    const os = process.platform
    console.log('Os running this app:', os);

    let cmd = '';
  


    switch (os) {
        case 'win32':
            const pathToRnsExe = path.join(__dirname, '..', '..', 'resources', 'engine', 'windows', 'rns.exe');
            console.log('Path to rns file:', pathToRnsExe);
            console.log('starModels length:', starModels.length);
            console.log('starModels model:', starModels[0].model);
            
            
            cmd = pathToRnsExe + ` -f ${starModels[0].eosFile} -t ${starModels[0].model}`;

            if(starModels.length === 1){
                switch (starModels[0].model) {
                    case 'model':
                        cmd += ` -e ${starModels[0].centralEnergyDensity}` 
                                + `${starModels[0].limit == 'limitEnergy' ? ` -l ${starModels[0].limitValue}` : ''}`
                                + ` -r ${starModels[0].valueForSecondInput}`
                                + `${starModels[0].limit == 'limitSecondValue' ? ` -l ${starModels[0].limitValue}` : ''}`
                                + `${starModels[0].limit !== 'none' ? ` -n ${starModels[0].measurements}` : ''}`
                                + `${starModels[0].readingsIgnored ? ' -d 0' : ''}`
                                
                         console.log('cmd for model:', cmd);
                            
                        
                        break;
                
                    default:
                        break;
                }
                 

            }else if (starModels.length > 1){
        
            }else {
                throw 'Fatal error -- starModels.length < 1';     
            };
            break;
    
        default:
            break;
    };
};

module.exports = connectToEngine;