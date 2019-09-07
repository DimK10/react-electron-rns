const path = require('path');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');


const connectToEngine = (starModels) => {
    const os = process.platform
    console.log('Os running this app:', os);

    let cmd = '';

    //Counters for succeded cmds and failed
    let succeded = 0;
    let failed = 0;
  


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
                let t0 = performance.now();
                // let child = exec(cmd, {maxBuffer: 102400 * 1024, timeout: 240000}, (err, stdout, stderr) => {
                //     if(err){
                //         console.log('error:', err);
                //         return;
                //     } else {
                //         console.log('output:', stdout);
                //         console.log('std error:', stderr);
                //         let t1 = performance.now();
                //         let executionTime = ((t1.toFixed(2) - t0.toFixed(2)) / 1000 / 60).toFixed(2); //In minutes
                //         console.log(`execution time: ${executionTime}  s`);
                //         child.kill();
                //     };
                // });

                const execShellCommand = (cmd) => {
                    const exec = require('child_process').exec;
                    return new Promise((resolve, reject) => {
                        exec(cmd, {maxBuffer: 102400 * 1024, timeout: 240000}, (error, stdout, stderr) => {
                            if (error) {
                                console.warn(error);
                            reject(error);
                            }
                            if(stdout){
                                let t1 = performance.now();
                                let executionTime = ((t1.toFixed(2) - t0.toFixed(2)) / 1000 / 60).toFixed(2); //In minutes
                                console.log(`execution time: ${executionTime}  m`);
                                resolve(stdout);
                            }
                            reject(stderr);
                        });
                    });
                }

                execShellCommand(cmd)
                .then((output) => {
                    console.log(output);
                    succeded += 1;
                    console.log('succeded:', succeded);  
                })
                .catch((error) => {
                    console.log('error:', error);
                    failed += 1;
                    console.log('failed:', failed);  
                })
                
                
                 

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