const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..','build');
const fs = require('fs');
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const connectToEngine = require('./utils/connectToEngine');
const extractValues = require('./utils/extractValues');
const sortData = require('./utils/sortData');
const isDev = false; //Testing purposes





const expressServer = (isDev) => {

    

    const eosPathBuildProd = path.join(__dirname, '../../eos-files'); //This is the right one for production 
    //const eosPathBuild = path.join(__dirname, '../resources/eos-files'); // This is for testing the build
    // const eosPath = isDev ? path.join(__dirname, '..', 'resources', 'eos-files') : path.join(__dirname, '../../eos-files');

    const app = express();

    if(isDev){
        const cors = require('cors');
        const whitelist = 'http://localhost:3000'
  
    //     const corsOptions = {
    //         origin:  (origin, callback) => {
    //         if (whitelist.indexOf(origin) !== -1) {
    //             callback(null, true)
    //         } else {
    //         callback(new Error('Not allowed by CORS'))
    //         };
    //     }
    //   };
  
      app.use(cors());
      
  
      app.get('/', function (req, res) {
          res.send('Set up')
        })
    } else {
        app.use(express.static(publicPath));

        // app.get('*', (req, res) => { // This causes eos files to fail to load -- removing
        //     res.sendFile(path.join(publicPath, 'index.html'));
        // });
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
      }));

    app.use(bodyParser.json());

    app.get('/eos', (req, res) => {
        // const eosPath = path.join(__dirname, '..', 'public', 'eos-files');
        // const eosPathBuild = path.join(path.dirname(__dirname), 'eos-files');

        fs.readdir(eosPathBuildProd, (err, files) => {
            if(err){
                res.send('error in readind the eos-file folder. ' + 'Path: ' + eosPathBuildProd +' Error: ' + err);
            }else {
                if (files.length === 0){
                    res.send(['No eos files in folder!']);
                }else{
                    console.log('files:', files);
                    
                    res.send(files);
                }
            }
        });
    });

    app.post('/stars/:id', (req, res) => {
        // console.log('req.body', req.body);
        const id = req.params.id;
        const starModels = req.body;
        console.log('id in express:', id);
        console.log('starModels in express:', starModels);

        let succeededModels = 0;
        let failedModels = 0;
        let models = []; //Will store only the necessary for successfl and failed models
        let resultsFromRns = []; // Holds the outputs created from rns.exe
        let outputs = [];
        let valuesForGraph = []; // Array that stores the objects of values calculated from rns.exe
            
        

        if(starModels.length === 0){
            console.log('No stars passed -- Shouldn\'t happen'); 
            res.status(404).send('No data sent -- logic error on button showing?'); 
        }else {
            let promiseArr = [];
            starModels.forEach((star) => {
                const data = connectToEngine(star);
                promiseArr.push(data);
            }); 
            
            async function allResults(arr) {
                return Promise.all(arr.map(item => (typeof item.then == 'function' ? item.then(value => ({value, ok:true}), error => ({error, ok:false})) : Promise.resolve(item))));
            }


            // console.log('Promise Array with status OK:', promiseArr);
            allResults(promiseArr)
            .then(results => {
                models = [];  //Reset?
                succeededModels = 0;
                failedModels = 0;
                results.forEach(result => {
                    if(result.ok) {
                        //good
                        succeededModels += 1;
                        models.push('succeeded');
                        resultsFromRns.push(result.value);
                    } else {
                        // bad
                        failedModels += 1;
                        models.push(result.error);
                        // reasonsForFailedModels.push(result.error);
                    };
                });

                // Extract floats from results and assign to the right arrays
                // This will be done in a new file 

                outputs = extractValues(resultsFromRns); // outputs is now an array of arrays!!!
                // valuesForGraph = sortData(outputs);
                // Reset
                outputs.forEach(output => {
                    valuesForGraph = [ ...valuesForGraph, sortData(output) ]; // Object containig objects
                });
                

                res.status(200).json({
                    id,
                    succeededModels,
                    failedModels,
                    models,
                    valuesForGraph 
                });
            });
        };
    });

      app.listen(port, () => {
          console.log('server is up in ' + port + ' eosPath: ' + eosPathBuildProd + ' dirName: ' + __dirname);
      });

};
module.exports = expressServer;
 