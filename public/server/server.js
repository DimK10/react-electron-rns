const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..');
const fs = require('fs');
const port = process.env.PORT || 5000;
const cors = require('cors');

// app.use(express.static(publicPath));

    const app = express();
    const whitelist = 'http://localhost:3000'
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

    app.use(cors());

    app.get('/', function (req, res) {
        res.send('Set up')
      })

    app.get('/eos', (req, res) => {
        const eosPath = path.join(__dirname, '..', 'eos-files');

        fs.readdir(eosPath, (err, files) => {
            if(err){
                res.send('error in readind the eos-file folder. Error:', err);
            }else {
                res.send(files);
            }
        });
    });

    app.listen(port, () => {
        console.log('server is up!');
    });

