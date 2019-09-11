const path = require('path');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');

const createArgumentsForEngine = require('./createArgumentsForEngine');


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

        let pathToEosFile = path.join(__dirname, '..', '..', 'resources', 'eos-files');
        console.log('starModels model:', starModel.model);
        
        let pathToRnsExecutable = '';
        switch (os) {
            case 'win32':
                pathToRnsExecutable = path.join(__dirname, '..', '..', 'resources', 'engine', 'windows', 'rns.exe');
                console.log('Path to rns file:', pathToRnsExecutable);
                break;

            case  'linux':
                pathToRnsExecutable = path.join(__dirname, '..', '..', 'resources', 'engine', 'linux', '/rns');
                console.log('Path to rns file:', pathToRnsExecutable);
                break
        
            default:
                break;
        };
                
                
    
        if(starModel){
            pathToEosFile = path.join(pathToEosFile, starModel.eosFile);
            cmd = pathToRnsExecutable + ` -f ${pathToEosFile} -t ${starModel.model}`;

            let t0 = performance.now();
            cmd = createArgumentsForEngine(cmd, starModel);

        } else {
            throw new Error('Fatal error -- starModel is null!');     
        };


        exec(cmd, {maxBuffer: 102400 * 1024, timeout: 30000}, (error, stdout, stderr) => {
            if(stdout && !error){
                console.log('stdout:', stdout);
                
                let t1 = performance.now();
                let executionTime = ((t1.toFixed(2) - t0.toFixed(2)) / 1000 / 60).toFixed(2); //In minutes
                console.log(`execution time: ${executionTime}  m`);
                succeded += 1;
                resolve(stdout);
            }

           
            if(error && error.signal === 'SIGTERM'){
                console.log('Entered if for sigterm');
                reject({ error: error.signal });
                return;                
            };
            if (error) {
                console.warn(error);
                
                reject(error);
                return;
            };
           
        });
    });
};



module.exports = connectToEngine;