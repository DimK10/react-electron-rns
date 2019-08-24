const path = require('path');
const { exec } = require('child_process');


const connectToEngine = (starModels) => {
    const os = process.platform
    console.log('Os running this app:', os);

    let cmd = '';
  


    switch (os) {
        case 'win32':
            const pathToRnsExe = path.join(__dirname, '..', '..', 'resources', 'engine', 'windows', 'rns.exe');
            let pathToEosFile = path.join(__dirname, '..', '..', 'resources', 'eos-files');
            console.log('Path to rns file:', pathToRnsExe);
            console.log('starModels length:', starModels.length);
            console.log('starModels model:', starModels[0].model);
            
            

            if(starModels.length === 1){
                pathToEosFile = path.join(pathToEosFile, starModels[0].eosFile);
                cmd = pathToRnsExe + ` -f ${pathToEosFile} -t ${starModels[0].model}`;

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
                    case 'gmass':
                        cmd += ` -e ${starModels[0].centralEnergyDensity}` 
                                + `${starModels[0].limit == 'limitEnergy' ? ` -l ${starModels[0].limitValue}` : ''}`
                                + ` -m ${starModels[0].valueForSecondInput}`
                                + `${starModels[0].limit == 'limitSecondValue' ? ` -l ${starModels[0].limitValue}` : ''}`
                                + `${starModels[0].limit !== 'none' ? ` -n ${starModels[0].measurements}` : ''}`
                                + `${starModels[0].readingsIgnored ? ' -d 0' : ''}`
                        console.log('cmd for model:', cmd);
                        break;      
        
                    default:
                        break;
                }
                exec(cmd, (err, stdout, stderr) => {
                    if(err){
                        console.log('error:', err);
                        return;
                    } else {
                        console.log('output:', stdout);
                        console.log('std error:', stderr);
                    };
                });
                 

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