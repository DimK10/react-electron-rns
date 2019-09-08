const path = require('path');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');


async function connectToEngine(starModel) {
    const os = process.platform
    console.log('Os running this app:', os);

    let cmd = '';

    //Counters for succeded cmds and failed
    let succeded = 0;
    let failed = 0;


    const exec = require('child_process').exec;

    let t0 = performance.now();

    return new Promise((resolve, reject) => {
        switch (os) {
            case 'win32':
                const pathToRnsExe = path.join(__dirname, '..', '..', 'resources', 'engine', 'windows', 'rns.exe');
                let pathToEosFile = path.join(__dirname, '..', '..', 'resources', 'eos-files');
                console.log('Path to rns file:', pathToRnsExe);
                console.log('starModels model:', starModel.model);
                
                
    
                if(starModel){
                    pathToEosFile = path.join(pathToEosFile, starModel.eosFile);
                    cmd = pathToRnsExe + ` -f ${pathToEosFile} -t ${starModel.model}`;
    
                    switch (starModel.model) {
                        case 'model':
                            cmd += ` -e ${starModel.centralEnergyDensity}` 
                                    + `${starModel.limit == 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
                                    + ` -r ${starModel.valueForSecondInput}`
                                    + `${starModel.limit == 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
                                    + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
                                    + `${starModel.readingsIgnored ? ' -d 0' : ''}`
                                    
                            console.log('cmd for model:', cmd);
    
                            break;
                        case 'gmass':
                            cmd += ` -e ${starModel.centralEnergyDensity}` 
                                    + `${starModel.limit == 'limitEnergy' ? ` -l ${starModel.limitValue}` : ''}`
                                    + ` -m ${starModel.valueForSecondInput}`
                                    + `${starModel.limit == 'limitSecondValue' ? ` -l ${starModel.limitValue}` : ''}`
                                    + `${starModel.limit !== 'none' ? ` -n ${starModel.measurements}` : ''}`
                                    + `${starModel.readingsIgnored ? ' -d 0' : ''}`
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
    
                } else {
                    throw 'Fatal error -- starModel is null!';     
                };
                break;
        
            default:
                break;
        };



        exec(cmd, {maxBuffer: 102400 * 1024, timeout: 120000}, (error, stdout, stderr) => {
            if (error) {
                // console.warn(error);
                failed += 1;
            reject(new Error('0'));
            }
            if(error.signal === 'SIGTERM'){
                console.log('Entered if for sigterm');
                reject({ reason: error.signal });
                
            }
            if(stdout && !error.signal){
                console.log('stdout:', stdout);
                
                let t1 = performance.now();
                let executionTime = ((t1.toFixed(2) - t0.toFixed(2)) / 1000 / 60).toFixed(2); //In minutes
                console.log(`execution time: ${executionTime}  m`);
                succeded += 1;
                resolve(stdout);
            }
            failed += 1;
            reject(new Error('0'));
        });
    });
};



module.exports = connectToEngine;