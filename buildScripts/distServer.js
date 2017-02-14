'use strict';

import express from 'express';
import path    from 'path';
import open    from 'open';
import compression from 'compression';


/* eslint-disable no-console */
const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Kevin","lastName":"Orfas", "email": "orfas@g.com"},
    {"id": 2,"firsName":"Anastasis","lastName":"Orfanidis", "email": "orfas@g.com"}
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
