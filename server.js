const express = require("express");
const connectDB = require("./config/db");
var app = express();
const path = require('path')

connectDB();

app.use(express.json({ extended: false }));

// DEFINE ROUTES
// app.use('/api/users', (req, res , next)=>{ res.send('users'); next()})
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets in production
if(process.env.NODE_ENV==='production'){
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'bulid','index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
