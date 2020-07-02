const express = require('express');
const connectDb = require('./config/db');
const connectDB = require('./config/db');

var app = express();

connectDB();

app.get('/', (req, res) => {
  console.log(req);
  res.status(200);
  res.send('api running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
