// create path
const path = require('path');
// create express app
const express = require('express');

var app = express();
const port =process.env.PORT || 3000;

const publicPath= path.join(__dirname,'/../public');

console.log(publicPath );

// static middleware
app.use(express.static(publicPath));

//app listen
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});