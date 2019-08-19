const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..','build');
const fs = require('fs');
const port = process.env.PORT || 4000;
// const cors = require('cors');


const expressServer = () => {
    const app = express();
    app.use(express.static(publicPath));
  

    app.get('/eos', (req, res) => {
        const eosPath = path.join(__dirname, '..', 'eos-files');

        fs.readdir(eosPath, (err, files) => {
            if(err){
                res.send('error in readind the eos-file folder. Error:', err);
            }else {
                if (files.length === 0){
                    res.send(['No eos files in folder!']);
                }else{
                    res.send(files);
                }
            }
        });
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
  });
  
    //   const app = express();
    //   const whitelist = 'http://localhost:3000'
  
    //   const corsOptions = {
    //     origin: function (origin, callback) {
    //       if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true)
    //       } else {
    //         callback(new Error('Not allowed by CORS'))
    //       }
    //     }
    //   }
  
    //   app.use(cors(corsOptions));
  
    //   app.get('/', function (req, res) {
    //       res.send('Set up')
    //     })
  
      
      app.listen(port, () => {
          console.log('server is up in', port);
      });

};
module.exports = expressServer;
 