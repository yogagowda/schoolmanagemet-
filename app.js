var express = require('express');//express
const mongoose = require('mongoose');
const studentRouter = require('./router/stdRouter');
const markRouter=require('./router/markRouter')
const staffRouter=require('./router/staffRouter')
var bodyParser = require('body-parser')
var path=require('path')

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var url = 'mongodb://0.0.0.0:27017/schooldata';

mongoose.connect(url, (err) => {
    if (err) {
      console.log("error in mongo connection...",err)
    } else {
      console.log("Database connected")
    }
});   

app.use(bodyParser.json())
app.use("/student", studentRouter);
app.use("/mark", markRouter);
app.use("/staff",staffRouter)

app.listen(3000, (err) => { 
    if (err) console.log('err',err)
    else console.log('server started')
});