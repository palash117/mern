const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/api/users')
var app = express();

connectDB();

app.get('/', (req, res) => {
  console.log(req);
  res.status(200);
  res.send('api running');
});
 
// DEFINE ROUTES
// app.use('/api/users', (req, res , next)=>{ res.send('users'); next()})
app.use('/api/users', require('./routes/api/users'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
