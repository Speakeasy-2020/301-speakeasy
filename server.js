// 'use strict'

const express = require('express');
const app = express();
require('dotenv');

app.get('*', (req, res) => { res.sendFile('index.html', { root: './public' }) })
// does nothing without app.listen
// app.listen(3000)
//   .then(console.log('alive on 3000'))
//   .catch(console.log('uh og'))
function startServer(){
  const port = process.env.PORT || 3000;
  app.listen(port)
    // .then(() => console.log(`Server Listening on ${port}`))
    // .catch(err => console.error(err));
};

startServer();
