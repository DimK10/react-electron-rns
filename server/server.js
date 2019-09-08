const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..','build');
const fs = require('fs');
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const connectToEngine = require('./utils/connectToEngine');
// const isDev = false; //Testing purposes

let succededModels = 0;
let failedModels = 0;

const expressServer = (isDev) => {

    // const eosPathBuild = path.join(__dirname, '../../eos-files'); This is the right one for production 
    const eosPath = isDev ? path.join(__dirname, '..', 'resources', 'eos-files') : path.join(__dirname, '../../eos-files');

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

        app.get('*', (req, res) => {
            res.sendFile(path.join(publicPath, 'index.html'));
        });
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
      }));

    app.use(bodyParser.json());

    app.get('/eos', (req, res) => {
        // const eosPath = path.join(__dirname, '..', 'public', 'eos-files');
        // const eosPathBuild = path.join(path.dirname(__dirname), 'eos-files');

        fs.readdir(eosPath, (err, files) => {
            if(err){
                res.send('error in readind the eos-file folder. ' + 'Path: ' + eosPath +' Error: ' + err);
            }else {
                if (files.length === 0){
                    res.send(['No eos files in folder!']);
                }else{
                    res.send(files);
                }
            }
        });
    });

    app.post('/stars', (req, res) => {
        // console.log('req.body', req.body);
        const starModels = req.body;

        if(starModels.length == 0){
            console.log('No stars passed -- Shouldn\'t happen'); 
            res.status(404).send('No data sent -- logic error on button showing?'); 
        }else {
            let promiseArr = [];
            starModels.forEach((star) => {
                const data = connectToEngine(star);
                promiseArr.push(data);
            }); 
            
            let num = 0;
            Promise.all(promiseArr)
            .then((promisesResult) => {
                console.log('res', promisesResult);

                promisesResult.forEach((singleResult) =>{
                    if(singleResult.length > 1) {
                        // Not rejected
                        num++;
                    }
                });
                
                succededModels += num;

                failedModels = starModels.length - succededModels;

                console.log('succededModels:', succededModels);
                console.log('failedModels:', failedModels);
                
                res.status(200).send(`succeeded ${succededModels} and failed ${failedModels}`);
                //Reset
                succededModels = 0;
                failedModels = 0;
            })
            .catch((err) => {
                console.log('error in promise all:', err);
                //Program reaches here but its not sending reponse back to server???
                res.status(400).send(err);
            });
        }



        // if(req !== {}){
        //     res.status(200).send('Star Models reseived. Models:', req.body);
        // } else {
        //     res.status(400).send('Not received');
        // }
    });

      app.listen(port, () => {
          console.log('server is up in ' + port + ' eosPath: ' + eosPath);
      });

};
module.exports = expressServer;
 