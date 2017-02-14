'use strict';

import express from 'express';
import path    from 'path';
import open    from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';


/* eslint-disable no-console */
const port = process.env.PORT || 3000;
const app = express();
const compliler = webpack(config);

app.use(require('webpack-dev-middleware')(compliler,{
    noInfo: true,
    publicPath: config.output.publicPath 
}));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstname":"Kevin","lastname":"Orfas", "email": "orfas@g.com"},
    {"id": 2,"firstname":"Anastasis","lastname":"Orfanidis", "email": "orfas@g.com"}
  ]);
});

app.listen(port, (err) => {
    if(err) {
        console.log(err)
    }
    else {
        open(`http://localhost:${port}`);
        console.log(`Listening to ${port}`);
    }
});
