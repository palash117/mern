const express = require('express');
const connectDB = require('./config/db');
var app = express();



connectDB();


app.use(express.json({extended: false}))
app.get('/', (req, res) => {
  console.log(req);
  res.status(200);
  res.send('api running');
});
 
// DEFINE ROUTES
// app.use('/api/users', (req, res , next)=>{ res.send('users'); next()})
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
