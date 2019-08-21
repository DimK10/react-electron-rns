const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..','build');
const fs = require('fs');
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
// const isDev = false; //Testing purposes


const expressServer = (isDev) => {

    // const eosPathBuild = path.join(__dirname, '../../eos-files'); This is the right one for production 
    const eosPath = isDev ? path.join(__dirname, '..', 'public', 'eos-files') : path.join(__dirname, '../../eos-files');

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
        console.log('req.body', req.body);
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
 